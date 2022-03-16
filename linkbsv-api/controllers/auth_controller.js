const errors = require("../consts/errors");
const {insertUser,getUserByUserName,getUser,addUserAppearanceData,addUserLinkOrder} = require("../helpers/db_helper");
const {validateSignUpReq,validateSignInReq} = require("../validators/auth_validator");
const referralController = require("./referral_controller");

const controller = {
    async doSignUp(req,res){
        try{
            let {userId,userName,avatarUrl,userHandleHandCash,userHandleMoneyButton,referrer,encMnemonics} = await validateSignUpReq(req.body);
            let user0 = await getUserByUserName(userName);
            let user1 = await getUser(userName);
            if(!user0 && !user1){
                    let timestamp = new Date().getTime();
                    let dbPayload = {
                        userId,encMnemonics,userName,avatarUrl,userHandleHandCash,userHandleMoneyButton,
                        createdAt : timestamp,
                        updatedAt : timestamp
                    }
                    
                    if(await insertUser(dbPayload)){

                        let r = await referralController.addReferralInfo({userId,referrer});
                        let r1 = await addUserAppearanceData({userId,themeId:"default",createdAt:timestamp,updatedAt:timestamp})
                        let r2 = await addUserLinkOrder({userId,createdAt:timestamp,updatedAt:timestamp});
                        
                        if(r){
                            _handleResponse(res,null,{
                                error : false,
                                data : dbPayload
                            })
                        }else{
                            _handleResponse(res,500)
                        }

        
                    }else{
                        _handleResponse(res,null,{
                            error : true,
                            body : {
                                code : errors.internalServerError.code,
                                message : errors.signUpError.message
                            }
                        }) 
                    }
            }else{
                _handleResponse(res,null,{
                    error : true,
                    body : {
                        code : errors.duplicateUser.code,
                        message : errors.duplicateUser.message
                    }
                })
            }




        }catch(e){
            console.log(e);
            _handleResponse(res,null,{
                error : true,
                body : {
                    code : errors.internalServerError.code,
                    message : e
                }
            })
        }
    },

    async doSignIn(req,res){
        try{
            let {userId} = await validateSignInReq(req.body);
            let user = await getUser(userId);
            if(user){
                    _handleResponse(res,null,{
                        error : false,
                        data : user
                    })
            }else{
                _handleResponse(res,null,{
                    error : true,
                    body : {
                        code : errors.invalidUser.code,
                        message : errors.invalidUser.message
                    }
                })
            }
        }catch(e){
            console.log(e);
            _handleResponse(res,null,{
                error : true,
                body : {
                    code : errors.internalServerError.code,
                    message : e
                }
            })
        }
    },

    async getAuthState(req,res){
        try{
            let userName = req.query['userName'];
            let authState = await getUserByUserName(userName)?1:0;
            
            _handleResponse(res,null,{
                error : false,
                data : {authState : authState}
            })


        }catch(e){
             
            _handleResponse(res,null,{
                error : true,
                body : {
                    code : errors.internalServerError.code,
                    message : e
                }
            })
        }
    }

}



module.exports = controller;