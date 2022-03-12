const {getUserAppearanceData,addUserAppearanceData,updateUserAppearanceData} = require("../helpers/db_helper");
const {validateGetUserThemeReq,validateAddUserThemeReq,validateUpdateUserThemeReq} = require("../validators/appearance_validator");
const errors = require("../consts/errors");


const Controller = {

     async getUserAppearanceInfo(req,res){
         let {userId} = await validateGetUserThemeReq(req.query);
         let theme = await getUserAppearanceData(userId);
         if(theme){
             _handleResponse(res,null,{
                 error : false,
                 data : theme
             })
         }else{
             _handleResponse(res,500)
         }

     },
     async addUserAppearanceInfo(req,res){
        let {userId,themeId} = await validateAddUserThemeReq(req.body);
        let timestamp = new Date().getTime();
        
        let dbPayload = {userId,themeId,createdAt:timestamp,updatedAt:timestamp}
        let r = await addUserAppearanceData(dbPayload);
        if(r){
            _handleResponse(res,null,{
                error : false,
                data : dbPayload
            })
        }else{
            _handleResponse(res,null,{
                error : true,
                body : {
                    code : errors.invalidPayment.code,
                    message : errors.invalidPayment.message
                }
            })
        }

    },
    async updateUserAppearanceInfo(req,res){
        let {userId,themeId} = await validateUpdateUserThemeReq(req.body);
        let timestamp = new Date().getTime();
        
        let dbPayload = {themeId,updatedAt:timestamp}
        let r = await updateUserAppearanceData(userId,dbPayload);
        if(r){
            _handleResponse(res,null,{
                error : false,
                data : dbPayload
            })
        }else{
            _handleResponse(res,null,{
                error : true,
                body : {
                    code : errors.invalidPayment.code,
                    message : errors.invalidPayment.message
                }
            })
        }

    }

}

module.exports = Controller