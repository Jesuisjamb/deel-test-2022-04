exports.findOne = async (params) =>{
    const {model, id, profileType, profileId} = params
    const {Contract} = model
    const queryObj = {
        'contractor': {id, ContractorId: profileId},
        'client'    : {id, ClientId: profileId}
    }

    return await Contract.findOne({
        where: queryObj[profileType],
    })
}