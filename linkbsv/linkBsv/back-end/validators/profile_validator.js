const {Validator} = require("node-input-validator");

const validateProfileUpdateReq = async(data)=>{
    let {userId,paymail} = data;
    const v = new Validator(data,{
        userId : "string|required",
        paymail : "string|required"
    })

    let matched = await v.check();

    if(matched){
        return {userId,paymail}
    }else{
        return v.errors();
    }
}

module.exports = {
    validateProfileUpdateReq
}