const {getProfile} = require('../middleware/getProfile')
const contractController = require('../controllers/contractController')
const express = require('express');
const response = express.response;
const router = express.Router();

// 1. ***GET*** `/contracts/:id` - This API is broken 😵! it should return the contract only if it belongs to the profile calling. better fix that!
router.get('/:id', getProfile, async (req, res = response) =>{
    const contract = await contractController.getById(req)
    if(!contract) return res.status(404).json({'msg':'Error'}).end()
    res.json({contract})
})

// 1. ***GET*** `/contracts` - Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.  
router.get('/', getProfile, async (req, res = response) =>{
    const contract = await contractController.getAll(req)
    if(!contract) return res.status(404).json({'msg':'Error'}).end()
    res.json({contract})
})

module.exports = router;