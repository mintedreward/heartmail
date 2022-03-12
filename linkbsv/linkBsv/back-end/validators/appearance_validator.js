const {Validator} = require("node-input-validator");

const validateGetUserThemeReq = async(data)=>{
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

const validateAddUserThemeReq = async(data)=>{
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

const validateUpdateUserThemeReq = async(data)=>{
    let {userId,themeId} = data;
    const v = new Validator(data,{
        userId : "string|required",
        themeId : "string|required"
    })
   let matched = await v.check();
   if(matched){
       return {
           userId,themeId
       }
   }else{
       throw v.errors;
   }
}

module.exports = {
    validateGetUserThemeReq,
    validateAddUserThemeReq,
    validateUpdateUserThemeReq
}