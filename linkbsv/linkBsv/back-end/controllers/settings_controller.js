const {validateGetAllSocialLinksReq,validateAddSocialLinksReq,validateSocialLinkPlatform,validateUpdateSocialLinksReq} = require("../validators/settings_validator");
const {getUserSocialLinksData,addUserSocialLinkData,updateUserSocialLinkData} = require("../helpers/db_helper");
const errors = require("../consts/errors");

const Controller = {
    async getUserAllSocialLinks(req,res){
        let {userId} = await validateGetAllSocialLinksReq(req.query);
        let links = await getUserSocialLinksData(userId);
        if(links){
          _handleResponse(res,null,{
              error : false,
              data : links
          })
        }else{
         _handleResponse(res,null,{
             error : true,
             body : {
                 code : errors.socialLinksRetrivalError.code,
                 message : errors.socialLinksRetrivalError.message
             }
         })
        }

    },
    async insertUserSocialLink(req,res){
        let {userId,platform,url} = await validateAddSocialLinksReq(req.body);

        let validPlatform = validateSocialLinkPlatform(platform);

        if(validPlatform){
            let timestamp = new Date().getTime();
            let dbPayload = {
                userId,
                platform,
                url,
                createdAt : timestamp,
                updatedAt : timestamp
            };
            let r = await addUserSocialLinkData(dbPayload);
            if(r){
               _handleResponse(res,null,{
                   error : false,
                   data : dbPayload
               })
            }else{
                _handleResponse(res,500);
            }
        }else{
            _handleResponse(res,null,{
                error : true,
                body : {
                    code : errors.invalidLinkTypeError.code,
                    message : errors.invalidLinkTypeError.message
                }
            })
        }
        

    },
    async updateUserSocialLink(req,res){
        let {userId,platform,url} = await validateUpdateSocialLinksReq(req.body);

        let validPlatform = validateSocialLinkPlatform(platform);

        if(validPlatform){
            let timestamp = new Date().getTime();
            let dbPayload = {
                url,
                createdAt : timestamp,
                updatedAt : timestamp
            };
            let r = await updateUserSocialLinkData(userId,platform,dbPayload);
            if(r){
               _handleResponse(res,null,{
                   error : false,
                   data : dbPayload
               })
            }else{
                _handleResponse(res,500);
            }
        }else{
            _handleResponse(res,null,{
                error : true,
                body : {
                    code : errors.invalidLinkTypeError.code,
                    message : errors.invalidLinkTypeError.message
                }
            })
        }
        

    }

}

module.exports = Controller;