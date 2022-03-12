const {Validator} = require("node-input-validator");

const validateAddLinkReq = async(data)=>{
    let {userId,title,txId,thumbnailUrl,description,url,orderWeight} = data;
    const v = new Validator(data,{
        userId : "string|required",
        title : "string|required",
        orderWeight : "integer",
        thumbnailUrl : "string|required",
        url : "string|required",
        decription:"string",
        txId : "string|required"
    })
    let matched = await v.check();
    if(matched){
        return {
            userId,title,description,thumbnailUrl,url,orderWeight,txId
        }
    }else{
        throw v.errors;
    }
}

const validateGetLinksReq = async(data)=>{
    let {userName} = data;
    const v = new Validator(data,{
        userName : "string|required"
    })
    let matched = await v.check();
    if(matched){
        return {
            userName
        }
    }else{
        throw v.errors;
    }
}

const validateUpdateLinkReq = async(data)=>{
    let {userId,linkId,title,thumbnailUrl,description,orderWeight,url} = data;
    const v = new Validator(data,{
        userId : "string|required",
        linkId : "string|required",
        title : "string|required",
        thumbnailUrl : "string",
        url : "string|required",
        decription:"string|required",
        orderWeight:'integer|required'
    })
    let matched = await v.check();
    if(matched){
        return {
            userId,linkId,title,thumbnailUrl,url,description,orderWeight
        }
    }else{
        throw v.errors;
    }
}

const validateUpdateLinkOrderWeightReq = async(data)=>{
    let {userId,linkId,orderWeight} = data;
    const v = new Validator(data,{
        userId : "string|required",
        linkId : "string|required",
        orderWeight:"integer|required"
    })
    let matched = await v.check();
    if(matched){
        return {
            userId,linkId,orderWeight
        }
    }else{
        throw v.errors;
    }
}

const validateUpdateLinkOrderReq = async(data)=>{
    let {userId,linkOrder} = data;
    const v = new Validator(data,{
        userId : "string|required",
        linkOrder : "string|required",
    })
    let matched = await v.check();
    if(matched){
        return {
            userId,linkOrder
        }
    }else{
        throw v.errors;
    }
}

const validateDeleteLinkReq = async(data)=>{
    let {userId,linkId} = data;
    const v = new Validator(data,{
        userId : "string|required",
        linkId : "string|required",
    })
    let matched = await v.check();
    if(matched){
        return {
            userId,linkId
        }
    }else{
        throw v.errors;
    }
}

module.exports = {
    validateAddLinkReq,
    validateGetLinksReq,
    validateUpdateLinkReq,
    validateDeleteLinkReq,
    validateUpdateLinkOrderWeightReq,
    validateUpdateLinkOrderReq
}