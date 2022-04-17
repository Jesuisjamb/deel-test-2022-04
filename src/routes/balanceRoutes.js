const {getProfile} = require('../middleware/getProfile')
const balanceController = require('../controllers/balanceController')
const express = require('express');
const response = express.response;
const router = express.Router();

// 1. ***POST*** `/balances/deposit/:userId` - Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)
router.post('/deposit/:userId', getProfile, async (req, res = response) =>{
    const actualBalance = await balanceController.addDeposit(req)
    if(!actualBalance) return res.status(404).json({'msg':'Error'}).end()
    res.json({actualBalance})
})

module.exports = router;