const sequelize = require('sequelize')
const {Op} = sequelize

// getBestProfession does the same as following query
// // SELECT p.id, p.profession, SUM(j.price) AS 'totalEarned' 
// // FROM Jobs AS j
// // INNER JOIN Contracts AS c
// // ON c.id = j.ContractId
// // INNER JOIN Profiles AS p
// // ON c.contractorId = p.id
// // WHERE (j.paymentDate BETWEEN "2010-04-15" AND "2022-08-15")
// // GROUP BY (p.profession)
// // ORDER BY totalEarned DESC;
exports.getBestProfession = async (params) =>{
    const {model, profileId, start, end} = params
    const {Contract, Job, Profile} = model
    const startISO = new Date(start)
    const endISO = new Date(end)

    return await Profile.findAll({
        where: {type: {[Op.eq]: 'contractor'}},
        raw: true,
        attributes: [
            'id',
            'profession',
            sequelize.literal('SUM(price) AS "totalEarned"'),
        ],
        group: ['Profile.profession'],
        order:[
            [sequelize.col('totalEarned'), 'DESC'],
        ],
        include: [{ 
            model: Contract, 
            as: 'Contractor',
            attributes: [],
            include: [{ 
                model: Job, 
                as: Contract,
                where: {
                    paymentDate: { [Op.between]: [startISO, endISO]}, paid: {[Op.eq]: true}
                },
                raw: true,
                attributes:[],
                required: true,
            }],
            required: true,
        }],
    })
    .then((queryData) => {
        if(!queryData[0]) throw('Empty object')
        return queryData[0]
    })
    .catch(e => {
        console.error(e)
        return
    })
}
