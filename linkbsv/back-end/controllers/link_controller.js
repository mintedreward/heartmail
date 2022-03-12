const {
        addUserLink,
        getUserLinks,
        updateUserLink,
        updateUserLinkOrderWeight,
        deleteUserLink,
        addLinkGenTx,
        getLink,
        getUserByUserName,
        getUserAppearanceData,
        getUserSocialLinksData,
        getReferral,
        getUserLinkOrder,
        updateUserLinkOrder
    } = require("../helpers/db_helper");

const {
        validateAddLinkReq,
        validateGetLinksReq,
        validateUpdateLinkReq,
        validateDeleteLinkReq,
        validateUpdateLinkOrderWeightReq,
        validateUpdateLinkOrderReq
    } = require("../validators/link_validator");

const {sortUserLinks} = require("../utils/link");

const errors = require("../consts/errors");
const nonce = require('nonce-generator');
const txController = require("../controllers/tx_controller");
const {sendLinkReferralBonus} = require("./referral_controller");
const {indexOf} = require("lodash");


const Controller = {

     async getUserLinks(req,res){
         let {userName} = await validateGetLinksReq(req.query);
         let user = await getUserByUserName(userName);
         let links = await getUserLinks(user['userId']);
         let appearance = await getUserAppearanceData(user['userId']);
         let socialLinks = await getUserSocialLinksData(user['userId']);
         let referralInfo = await getReferral(user['userId']);
         let linkOrderInfo = await getUserLinkOrder(user['userId']);
         let linkOrder = linkOrderInfo && linkOrderInfo['linkOrder']?linkOrderInfo['linkOrder']:null;
         if(links){
             _handleResponse(res,null,{
                 error : false,
                 data : {
                     links : links,
                     profile : user,
                     appearance : appearance,
                     socialLinks : socialLinks,
                     referralLink : referralInfo? referralInfo['referralId'] : null,
                     linkOrder,
                     sortedLinks : sortUserLinks(links,linkOrder)
                 }
             })
         }else{
             _handleResponse(res,null,{
                 error : true,
                 body : {
                     code : errors.userLinksRetrivalError.code,
                     message : errors.userLinksRetrivalError.message
                 }
             })
         }

     },

     async addUserLink(req,res){
        let {userId,title,description,thumbnailUrl,url,orderWeight,txId} = await validateAddLinkReq(req.body);
        let timestamp = new Date().getTime();
        
        let validTx = await txController.verifyProfOfLinkGenerationPayment(txId);

        if(validTx){
            let linkId = nonce(16);
            let dbPayload = {
                userId,title,description,thumbnailUrl,url,orderWeight,
                linkId : linkId,
                createdAt : timestamp,
                updatedAt : timestamp
           }
           let r = await addUserLink(dbPayload);
           if(r){
               let r1 = await sendLinkReferralBonus(userId);
               let r2 = await addLinkGenTx({userId,linkId,txId,createdAt:timestamp});
               let r3 = await getUserLinkOrder(userId);
               
               if(r3 && r3['linkOrder']){
                   let linkOrder = JSON.parse(r3['linkOrder']);
                   linkOrder.push(linkId);
                   let r4 = await updateUserLinkOrder(userId,{linkOrder : JSON.stringify(linkOrder),updatedAt:timestamp});
               }else{
                   let linkOrder = JSON.stringify(new Array(linkId));
                   let r5 = await updateUserLinkOrder(userId,{linkOrder,updatedAt:timestamp});
               }

               _handleResponse(res,null,{
                   error : false,
                   data : {...dbPayload,referralBonus:r1}
               })
           }else{
               _handleResponse(res,null,{
                   error : true,
                   body : {
                       code : errors.userLinkAddError.code,
                       message : errors.userLinkAddError.message
                   }
               })
           }
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
    async updateUserLink(req,res){
        let {userId,linkId,title,thumbnailUrl,url} = await validateUpdateLinkReq(req.body);
        let timestamp = new Date().getTime();
        

        let dbPayload = {
             userId,title,thumbnailUrl,url,
             updatedAt : timestamp
        }
        let r = await updateUserLink(linkId,dbPayload);
        if(r){
            _handleResponse(res,null,{
                error : false,
                data : dbPayload
            })
        }else{
            _handleResponse(res,null,{
                error : true,
                body : {
                    code : errors.userLinkUpdateError.code,
                    message : errors.userLinkUpdateError.message
                }
            })
        }

    },
    async updateUserLinkOrderWeightData(req,res){
        let {userId,linkId,orderWeight} = await validateUpdateLinkOrderWeightReq(req.body);
        let timestamp = new Date().getTime();
        

        let dbPayload = {
             orderWeight,
             updatedAt : timestamp
        }
        let r = await updateUserLinkOrderWeight(linkId,dbPayload);
        if(r){
            _handleResponse(res,null,{
                error : false,
                data : dbPayload
            })
        }else{
            _handleResponse(res,null,{
                error : true,
                body : {
                    code : errors.userLinkUpdateError.code,
                    message : errors.userLinkUpdateError.message
                }
            })
        }

    },

    async updateUserLinkOrderData(req,res){
        let {userId,linkOrder} = await validateUpdateLinkOrderReq(req.body);
        let timestamp = new Date().getTime();
        

        let dbPayload = {
             linkOrder,
             updatedAt : timestamp
        }
        let r = await updateUserLinkOrder(userId,dbPayload);
        if(r){
            _handleResponse(res,null,{
                error : false,
                data : dbPayload
            })
        }else{
            _handleResponse(res,null,{
                error : true,
                body : {
                    code : errors.userLinkUpdateError.code,
                    message : errors.userLinkUpdateError.message
                }
            })
        }

    },


    async deleteUserLink(req,res){
        let {userId,linkId} = await validateDeleteLinkReq(req.body);        
        let link = await getLink(linkId);
        let timestamp = new Date().getTime();

        if(link && link['userId'] == userId){
            let r = await deleteUserLink(linkId);
            let r1 = await getUserLinkOrder(userId);

            if(r1){
                let order = JSON.parse(r1['linkOrder']);
                let index = indexOf(order,linkId);
                if(order){
                    if(index != -1){
                        order.splice(index,1);
                        await updateUserLinkOrder(userId,{linkOrder:order.length>0?JSON.stringify(order):null,updatedAt:timestamp});
                    }

                }
            }


            if(r){
                _handleResponse(res,null,{
                    error : false,
                    data : link
                })
            }else{
                _handleResponse(res,null,{
                    error : true,
                    body : {
                        code : errors.userLinkDeleteError.code,
                        message : errors.userLinkDeleteError.message
                    }
                })
            }

        }else{
            _handleResponse(res,null,{
                error : true,
                body : {
                    code : errors.unauthorizedOperation.code,
                    message : errors.unauthorizedOperation.message
                }
            })
        }

    }

}

module.exports = Controller