const adminService = require('../service/adminService')

exports.getBestProfession = async (req) =>{
    const model = req.app.get('models')
    const profileId = `${req.profile.id}`
    const {start, end} = req.query
    
    if(!start || !end ) return
    return await adminService.getBestProfession({model, profileId, start, end})
}

exports.getBestClients = async (req) =>{
    const model = req.app.get('models')
    const profileId = `${req.profile.id}`
    const {start, end, limit = 2} = req.query
    
    if(!start || !end ) return
    return await adminService.getBestClients({model, profileId, start, end, limit})
}