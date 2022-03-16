const {validateGetReferralInfoReq} = require("../validators/referral_validator");
const {getReferral,addReferralInfo,getReferralInfoViaToken,addReferralClaimInfo, getUser} = require("../helpers/db_helper");
const txController = require("./tx_controller");
const nonce = require("nonce-generator");


const Controller = {
    async getReferralInfo(req,res){
        let {userId} =  await validateGetReferralInfoReq(req.query);
        let referalInfo = await getReferral(userId);
        if(referalInfo){
            _handleResponse(res,null,{
                error : false,
                data : referalInfo
            })
        }else{
            _handleResponse(res,500)
        }
    },

    async sendLinkReferralBonus(userId){
          let referralInfo = await getReferral(userId);
          let returnVal = false;
          try{
              if(referralInfo && referralInfo['referrer']){
                  let referrerInfo = await getUser(referralInfo['referrer']);
                  if(referrerInfo['userHandleHandCash']){
                      let amount = parseFloat((process.env.DEFAULT_LINK_GENERATION_FEE*referralInfo['bonusPerc'])/100);
    
                      let r = await txController.makeRefBonusTx(referrerInfo['userHandleHandCash'],amount);
                      let txId = (returnVal)?returnVal['transactionId']:null;
                      let payload = {
                        userId,
                        referralId : referralInfo['referralId'],
                        txId : txId,
                        createdAt : new Date().getTime()
                        }
                      let r1 = await addReferralClaimInfo(payload);
                      returnVal = r?r:false;

                  }

              }


          }catch(e){
              //console.log(e);
              returnVal = false;
          }finally{
              return returnVal;
          }
    },

    async addReferralInfo(data){


         let {userId,referrer} = data;
         let referrerInfo = await this.validateReferralToken(referrer);


         let timestamp = new Date().getTime();
         let dbPayload = {
             referralId : nonce(8),
             userId,
             referrer : referrerInfo?referrerInfo['userId']:null,
             createdAt : timestamp,
             updatedAt : timestamp
         }
        let r = await addReferralInfo(dbPayload);
        if(r){
            return true;
        }else{
            return false;
        }
    },

    async validateReferralToken(token){
         let r = await getReferralInfoViaToken(token);
         if(r && r.length>0){
             return r[0];
         }else{
             return false;
         }

    }
}

module.exports = Controller;