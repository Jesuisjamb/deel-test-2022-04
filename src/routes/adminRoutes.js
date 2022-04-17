const {getProfile} = require('../middleware/getProfile')
const adminController = require('../controllers/adminController')
const express = require('express');
const response = express.response;
const router = express.Router();

// 1. ***GET*** `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.
router.get('/best-profession', getProfile, async (req, res = response) =>{
    const bestProfession = await adminController.getBestProfession(req)
    if(!bestProfession) return res.status(404).json({'msg':'Error'}).end()
    res.json({bestProfession})
})

// 1. ***GET*** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` - returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.
router.get('/best-clients', getProfile, async (req, res = response) =>{
    const bestClients = await adminController.getBestClients(req)
    if(!bestClients) return res.status(404).json({'msg':'Error'}).end()
    res.json({bestClients})
})

module.exports = router;