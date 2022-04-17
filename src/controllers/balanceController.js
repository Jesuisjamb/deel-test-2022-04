const balanceService = require('../service/balanceService')

exports.addDeposit = async (req) =>{
    const model = req.app.get('models')
    const profileId = `${req.profile.id}`
    const {userId} = req.params
    
    if(!Number.isInteger(parseInt(userId))) return
    return await balanceService.handleBalance({model, profileId, userId})
}