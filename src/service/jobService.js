const { Op } = require('sequelize')

exports.findAllUnpaid = async (params) =>{
    const {model, profileId, profileType} = params
    const {Contract, Job} = model
    const queryObj = {
        'contractor': {status: 'in_progress', ContractorId: profileId},
        'client'    : {status: 'in_progress', ClientId: profileId}
    }

    return await Job.findAll({
        where: {paid: {[Op.not]: true}},
        raw: true,
        include: [{ 
            model: Contract, 
            as: Contract, 
            where: queryObj[profileType], 
            required: true
        }],
    })
}