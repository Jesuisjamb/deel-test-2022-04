const sequelize = require('sequelize')
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

exports.handlePayable = async (params) =>{
    const {model, profileId, job_id} = params
    const {Contract, Job, Profile} = model

    return await Job.findAll({
        where: {paid: {[Op.not]: true}, id: job_id  },
        raw: true,
        include: [{ 
            model: Contract, 
            as: Contract, 
            where: { ClientId: profileId }, 
            include: [{ 
                    model: Profile, 
                    as: 'Client', 
                    required: true
                }],
            required: true,
        }],
    })
    .then(async(jobData) => {
        if(!jobData[0]) throw('Empty object')
        const clientBalance = parseFloat(jobData[0]['Contract.Client.balance'])
        const jobPrice      = parseFloat(jobData[0].price)
        const jobId         = jobData[0].id
        const isJobPaid     = jobData[0].paid

        if(!isJobPaid){
            if(clientBalance >= jobPrice){
                const newClientBalance = (clientBalance - jobPrice).toFixed(2)
                const contractorId = jobData[0]['Contract.ContractorId']
                const date = new Date
                
                // Transactions
                await Profile.update({ balance: newClientBalance }, {where : { id: profileId }})
                await Profile.update({ balance: sequelize.literal(`balance + ${jobPrice}`)}, {where : { id: contractorId }})
                await Job.update({ paid: 1, paymentDate: date.toISOString() }, {where : { id: jobId }})
                return{'msg':'Payment sent'}
            }
            else return{'msg':'Missing balance'}
        }
        else return{'msg':'Job already paid in full'}
    })
    .catch(e => {
        console.error(e)
        return
    })
}