const {Validator} = require("node-input-validator");

module.exports = {
    validateGetAllSocialLinksReq : async(data)=>{
        let {userId} = data;
        const v = new Validator(data,{
            userId : "string|required"
        });
        let matched = await v.check();
        if(matched){
            return {
                userId
            }
        }else{
            throw (v.errors)
        }
    },
    validateAddSocialLinksReq : async(data)=>{
        let {userId,platform,url} = data;
        const v = new Validator(data,{
            userId : "string|required",
            platform : "string|required",
            url : "string:required"
        });
        let matched = await v.check();
        if(matched){
            return {
                userId,
                platform,
                url
            }
        }else{
            throw (v.errors)
        }
    },
    validateUpdateSocialLinksReq : async(data)=>{
        let {userId,platform,url} = data;
        const v = new Validator(data,{
            userId : "string|required",
            platform : "string|required",
            url : "string:required"
        });
        let matched = await v.check();
        if(matched){
            return {
                userId,
                platform,
                url
            }
        }else{
            throw (v.errors)
        }
    },
    validateSocialLinkPlatform : (platform)=>{
        let l = platform.trim().toLowerCase();
        if(
            l=="email" || 
            l=="paymail" ||
            l=="baemail" ||
            l=="handcash" ||
            l=="moneybutton" ||
            l=="relayx" ||
            l=="simplycash" ||
            l=="pixelWalet" ||
            l=="patreon" ||
            l=="facebook" ||
            l=="twetch" ||
            l=="twitter" ||
            l=="relica" ||
            l=="instagram" ||
            l=="whatsapp" ||
            l=="telegram" ||
            l=="signal" ||
            l=="pinterest" ||
            l=="tiktok" ||
            l=="spotify"         
        ){
            return true;
        }else{
            return false;
        }
    }
}