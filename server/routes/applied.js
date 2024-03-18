const express = require('express')
// const { body, validationResult, custom } = require('express-validator');
// const tokenValid = require('../middlewares/tokenValid');
const tokenValid2 = require('../middlewares/tokenValid2');
const Applied = require('../models/Applied');
const Job = require('../models/Job');

const router = express.Router()

router.post('/applyJob/:id', tokenValid2, async (req, res)=>{
        
            try {
                const job=await Applied.find({student:req.student.id, Job:req.params.id});
                if(job.length!==0){
                    return res.json({success:false, message:"already applied"});
                } 
                else{
                    const job2=Applied({
                        student:req.student.id,
                        Job:req.params.id
                    })
                    await job2.save();
                    return res.json({success:true, job2});
                }
            } catch (error) {
                return res.status(500).json({ success: false, message: "some error occured" });
            }
        }
      );


router.get('/fetchAllapplied', tokenValid2, async(req, res)=>{
    try {
        const appliedjobs=await Applied.find({student:req.student.id});
        const jobs=[];
        for(let i=0; i<appliedjobs.length; i++){
            const job=await Job.findOne({_id:appliedjobs[i].Job})
            jobs.push(job);
        }
        return res.json({success:true, jobs})
        // return res.json({success:true, jobs});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
})

module.exports=router