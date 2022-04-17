const jobService = require('../service/jobService')

exports.getUnpaid = async (req) =>{
    const model = req.app.get('models')
    const profileId = `${req.profile.id}`
    const profileType = `${req.profile.type}`

    return await jobService.findAllUnpaid({model, profileId, profileType})
}
