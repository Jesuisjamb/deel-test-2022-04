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
}