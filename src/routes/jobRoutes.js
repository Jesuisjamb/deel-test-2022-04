const {getProfile} = require('../middleware/getProfile')
const jobController = require('../controllers/jobController')
const express = require('express');
const response = express.response;
const router = express.Router();

// 1. ***GET*** `/jobs/unpaid` -  Get all unpaid jobs for a user (***either*** a client or contractor), for ***active contracts only***.
router.get('/unpaid', getProfile, async (req, res = response) =>{
    const unpaidJobs = await jobController.getUnpaid(req)
    if(!unpaidJobs) return res.status(404).json({'msg':'Error'}).end()
    res.json({unpaidJobs})
})

// 1. ***POST*** `/jobs/:job_id/pay` - Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.

module.exports = router;