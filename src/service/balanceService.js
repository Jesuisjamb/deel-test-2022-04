const sequelize = require('sequelize')
const {Op} = sequelize

exports.handleBalance = async (params) =>{
    const {model, profileId, userId} = params
    const {Contract, Job, Profile} = model

    return await Contract.findAll({
        where: {ClientId: userId,},
        raw: true,
        include: [{ 
            model: Job, 
            as: Contract, 
            where: {paid: {[Op.not]: true}},
            attributes:[
                [sequelize.fn('sum', sequelize.col('price')),'total']
            ],
            raw: true,
            required: true,
        }],
    })
    .then(async (contractData) => {
        if(!contractData[0]) throw('Empty object')
        
        const totalJobs  = parseFloat(contractData[0]['Jobs.total'])
        const clientId   = contractData[0]['ClientId']
        const newBalance = parseFloat((totalJobs)*0.25).toFixed(2)
        
        // Transaction
        await Profile.update({ balance: sequelize.literal(`balance + ${newBalance}`)}, {where : { id: clientId }})
        return {'msg':'Balance added'}
    })
    .catch(e => {
        console.error(e)
        return
    })
}