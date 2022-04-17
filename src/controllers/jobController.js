const jobService = require('../service/jobService')

exports.getUnpaid = async (req) =>{
    const model = req.app.get('models')
    const profileId = `${req.profile.id}`
    const profileType = `${req.profile.type}`

    return await jobService.findAllUnpaid({model, profileId, profileType})
}

exports.addPayment = async (req) =>{
    const model = req.app.get('models')
    const profileId = `${req.profile.id}`
    const {job_id} = req.params
    
    if(!Number.isInteger(parseInt(job_id))) return
    return await jobService.handlePayable({model, profileId, job_id})
}