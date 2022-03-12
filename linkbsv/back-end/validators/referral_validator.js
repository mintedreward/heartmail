const {Validator} = require("node-input-validator");

const validateGetReferralInfoReq = async(data)=>{
     let {userId} = data;
     const v = new Validator(data,{
         userId : "string|required"
     })
    let matched = await v.check();
    if(matched){
        return {
            userId
        }
    }else{
        throw v.errors;
    }
}

module.exports = {
    validateGetReferralInfoReq
}