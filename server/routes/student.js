const express = require('express')
const Student = require('../models/Student')
const router = express.Router()
const bcrypt = require('bcryptjs');
const { body, validationResult, custom } = require('express-validator');
const jwt=require('jsonwebtoken');
const tokenValid2 = require('../middlewares/tokenValid2');
const dotenv=require('dotenv');
dotenv.config();

const JWT_KEY=process.env.JWT_KEY

router.post('/signup', [
    body('password', "enter a valid password").isLength({ min: 5 }),
    body('name', "enter a valid name").isLength({ min: 3 }),
    body('mail').custom(async value => {
        const student = await Student.find({ "mail": value });
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
                const student = Student({
                    name: req.body.name,
                    mail: req.body.mail,
                    password: hash
                })
                await student.save();

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
        const student = await Student.find({ "mail": value });
        if (student.length == 0) {
            throw new Error('invalid credentials');
        }
    }),
],
    async (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            const mail = req.body.mail
            try {
                let student = await Student.findOne({ mail });
                const compare = await bcrypt.compare(req.body.password, student.password);
                if (!compare) {
                    return res.status(400).send({ success: false, message: "Invalid credentials" });
                }
                else {
                    const data = {
                        student: {
                            id: student._id
                        }
                    }
                    const token = jwt.sign(data, JWT_KEY);
                    return res.json({ success: true, token })
                }

            } catch (error) {
                return res.status(500).json({ success: false, message: "some error occured" });
            }

        }
        res.send({ success: false, error: result.array() });

    })

    router.get('/fetchDetails',tokenValid2, async(req, res)=>{
        try {
            const stud=await Student.findById(req.student.id);
            return res.json({success:true, stud});
        } catch (error) {
            return res.status(500).json({ success: false, message: "some error occured" });
        }
    })

    router.put('/editDetails', tokenValid2, async(req, res)=>{
        try {
            const student=await Student.findById(req.student.id);
            if(!student){
                return res.json({success:false, message:"not found"});
            }
            const newStud={
                name:student.name,
                mail:student.mail,
                password: student.password,
                date:student.date,
            }
            if(req.body.skills){
                newStud.skills=req.body.skills;
            }
            if(req.body.name){
                newStud.name=req.body.name;
            }
            if(req.body.GPA){
                newStud.GPA=req.body.GPA;
            }
            if(req.body.branch){
                newStud.branch=req.body.branch;
            }
            const stud = await Student.findByIdAndUpdate(req.student.id, { $set: newStud }, { new: true })
            return res.json({success:true, stud});
        } catch (error) {
            return res.status(500).json({ success: false, message: "some error occured" });
        }
    })

module.exports = router