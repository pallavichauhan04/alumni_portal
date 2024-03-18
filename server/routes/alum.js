const express = require('express')
const Alum = require('../models/Alum')
const router = express.Router()
const bcrypt = require('bcryptjs');
const { body, validationResult, custom } = require('express-validator');
const jwt = require('jsonwebtoken');
const tokenValid = require('../middlewares/tokenValid');
const dotenv=require('dotenv');
dotenv.config();

const JWT_KEY2 = process.env.JWT_KEY2

router.post('/signup', [
    body('password', "enter a valid password").isLength({ min: 5 }),
    body('name', "enter a valid name").isLength({ min: 3 }),
    body('mail').custom(async value => {
        const student = await Alum.find({ "mail": value });
        if (student.length != 0) {
            throw new Error('E-mail already in use');
        }
    }),
    body('mail', "enter a valid email address").isEmail(),
], async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                throw new Error('error while creating the salt');
            }
            bcrypt.hash(req.body.password, salt, async function (err, hash) {
                if (err) {
                    throw new Error('error while hashing');
                }
                const alum = Alum({
                    name: req.body.name,
                    mail: req.body.mail,
                    password: hash
                })
                await alum.save();

            });
        });
        return res.json({ success: true });
    }

    res.send({ success: false, error: result.array() });

})

router.post('/login', [
    body('password', "enter a valid password").exists(),
    body('mail', "enter a valid email address").isEmail(),
    body('mail').custom(async value => {
        const alum = await Alum.find({ "mail": value });
        if (alum.length == 0) {
            throw new Error('invalid credentials');
        }
    }),
],
    async (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            const mail = req.body.mail
            try {
                let alum = await Alum.findOne({ mail });
                const compare = await bcrypt.compare(req.body.password, alum.password);
                if (!compare) {
                    return res.status(400).send({ success: false, message: "Invalid credentials" });
                }
                else {
                    const data = {
                        alum: {
                            id: alum._id
                        }
                    }
                    const token = jwt.sign(data, JWT_KEY2);
                    return res.json({ success: true, token })
                }

            } catch (error) {
                return res.status(500).json({ success: false, message: "some error occured" });
            }

        }
        res.send({ success: false, error: result.array() });

    })

router.get('/fetchDetails', tokenValid, async (req, res) => {
    try {
        const alum = await Alum.findById(req.alum.id);
        return res.json({ success: true, alum });
    } catch (error) {
        return res.status(500).json({ success: false, message: "some error occured" });
    }
})

router.put('/editDetails', tokenValid, async (req, res) => {
    try {
        const alum = await Alum.findById(req.alum.id);
        if (!alum) {
            return res.json({ success: false, message: "not found" });
        }
        const newAlum = {
            name: alum.name,
            mail: alum.mail,
            password: alum.password,
            date: alum.date,
        }
        if (req.body.ph_no) {
            newAlum.ph_no = req.body.ph_no;
        }
        if (req.body.work) {
            newAlum.work = req.body.work;
        }
        if (req.body.founders) {
            newAlum.founders = req.body.founders;
        }
        if (req.body.year_founded_in) {
            newAlum.year_founded_in = req.body.year_founded_in;
        }
        const alum2 = await Alum.findByIdAndUpdate(req.alum.id, { $set: newAlum }, { new: true })
        return res.json({ success: true, alum2});
    } catch (error) {
        return res.status(500).json({ success: false, message: "some error occured" });
    }
})

module.exports = router