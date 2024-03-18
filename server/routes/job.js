const express = require('express')
const { body, validationResult, custom } = require('express-validator');
const tokenValid = require('../middlewares/tokenValid');
const tokenValid2 = require('../middlewares/tokenValid2');
const Job = require('../models/Job');
const Applied=require('../models/Applied')

const router = express.Router()

router.post('/addJob', tokenValid, [
    body('role', "enter a valid role").isLength({ min: 2 }),
    body('name', "enter a valid name").isLength({ min: 3 }),
    // body('stipend', "enter value above or greater than equal to 1000").isInt({ gt: 1000}),
], (req, res)=>{
    const result = validationResult(req);
        if (result.isEmpty()) {
            try {
                const job=Job({
                    user:req.alum.id,
                    name:req.body.name,
                    role:req.body.role,
                    stipend:req.body.stipend
                })

                job.save();
                return res.send({ success: true, job })
            } catch (error) {
                return res.status(500).json({ success: false, message: "some error occured" });
            }
        }
        res.send({ success: false, error: result.array() });

})

router.delete('/deleteJob/:id', tokenValid, async (req, res) => {
    try {

        // Find the note to be deleted 
        let job = await Job.findById(req.params.id);
        if (!job) { return res.status(404).json({success: false,message:"Not Found"}) }

        if (job.user.toString() !== req.alum.id) {
            return res.status(401).json({success:false, message:"Not Allowed"});
        }
        job = await Job.findByIdAndDelete(req.params.id)
        appliedJobs=await Applied.deleteMany({Job:req.params.id}) 
        res.json({success:true, message:"Note deletion successful", job, appliedJobs});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:true, message:"Internal Server Error"});
    }
})

router.get('/fetchAll', tokenValid2, async(req, res)=>{
    try {
        const jobs=await Job.find({});
        return res.json({success:true, jobs})
        // return res.json({success:true, jobs});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
})

router.get('/fetchAllbyId', tokenValid, async(req, res)=>{
    try {
        const id=req.alum.id
        const jobs=await Job.find({user:id})
        return res.json({success:true, jobs})
        // return res.json({success:true, jobs});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
})

module.exports=router