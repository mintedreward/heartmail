const userModel = require("../models/user");
const settingsModel = require("../models/settings");
const socialLinkModel = require("../models/socialLink");
const linkModel = require("../models/link");
const referralModel = require("../models/referral");
const impressionModel = require("../models/impression");
const referralClaimModel = require("../models/referralClaim");
const linkGenTxModel = require("../models/linkGenTx");
const appearanceModel = require("../models/appearance");
const linkOrderModel = require("../models/link_order");


const initPreAction = async()=>{
    //  try{
    //      let r = await linkModel.updateMany({},{"$set":{"orderWeight": 0}}, {upsert:true,"multi": true},).exec();
    //      console.log(r);
    //  }catch(e){
    //      console.log(e)
    //  }

    // try{
    //    let r = await getTopUsers();
    //    let t = new Date().getTime();
    //    r.forEach(async(u)=>{
    //        let payload = {
    //            userId : u['userId'],
    //            createdAt : t,
    //            updatedAt : t
    //        }
    //        await addUserLinkOrder(payload);
    //    })
    // }catch(e){
    //     console.log(e);
    // }

}

const insertUser = async (data)=>{
   try{
      let model = new userModel(data);
      await model.save(data);
      return true;
   }catch(e){
       console.log(e);
       return false;
   }
}

const getUser = async (userId)=>{
    try{
       let r = await userModel.find({userId:userId}).exec();
       if(r && r.length>0){
           return r[0];
       }else{
           return false;
       }
    }catch(e){
        console.log(e);
        return false;
    }
}

const getTopUsers = async ()=>{
    try{
       let r = await userModel.find({}).limit(100).exec();
       return r;
    }catch(e){
        console.log(e);
        return false;
    }
}

const addUserLinkOrder = async (data)=>{
    try{
       let model = new linkOrderModel(data);
       await model.save(data);
       return true;
    }catch(e){
        console.log(e);
        return false;
    }
 }

 const updateUserLinkOrder = async (userId,data)=>{
    try{
       let r = linkOrderModel.findOneAndUpdate({userId:userId},data,{useFindAndModify:false}).exec();
       return r;
    }catch(e){
        console.log(e);
        return false;
    }
 }
 const getUserLinkOrder = async (userId)=>{
    try{
       let r = linkOrderModel.findOne({userId:userId}).exec();
       return r;
    }catch(e){
        console.log(e);
        return false;
    }
 }

const getUserByUserName = async (userName)=>{
    try{
       let r = await userModel.find({userName:userName}).exec();
       if(r && r.length>0){
           return r[0];
       }else{
           return false;
       }
    }catch(e){
        console.log(e);
        return false;
    }
}

const getUserSocialLinksData = async(userId)=>{
    try{
        let r = await socialLinkModel.find({userId:userId}).exec();
        return r;
    }catch(e){
        console.log(e);
        return false;
    }
}

const addUserSocialLinkData = async(data)=>{
    try{
        let model = new socialLinkModel(data);
        await model.save();
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}
const updateUserSocialLinkData = async(userId,platform,data)=>{
    try{
        let r = await socialLinkModel.findOneAndUpdate({userId:userId,platform:platform},data).exec();
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

const getLink = async(linkId)=>{
    try{
        let r = await linkModel.findOne({linkId:linkId}).exec();
        return r;
    }catch(e){
        console.log(e);
        return false;
    }
}

const getUserLinks = async(userId)=>{
    try{
        let r = await linkModel.find({userId:userId}).sort({'createdAt':-1}).exec();
        return r;
    }catch(e){
        console.log(e);
        return false;
    }
}


const getUserAppearanceData = async(userId)=>{

    try{
        let r = appearanceModel.findOne({userId:userId}).exec();
        return r;
    }catch(e){
        console.log(e);
        return false;
    }

}


const addUserAppearanceData = async(data)=>{
    try{
        let model = new appearanceModel(data);
        await model.save();
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

const updateUserAppearanceData = async(userId,data)=>{
    try{
        let r = await appearanceModel.findOneAndUpdate({userId:userId},data).exec();
        
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

const addUserLink = async(data)=>{
    try{
        let model = new linkModel(data);
        await model.save();
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

const updateUserLink = async(linkId,data)=>{
    try{
        let r = await linkModel.findOneAndUpdate({linkId:linkId},data,{useFindAndModify:false}).exec();
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

const updateUserLinkOrderWeight = async(linkId,data)=>{
    try{
        let r = await linkModel.findOneAndUpdate({linkId:linkId},data).exec();
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

const deleteUserLink = async(linkId)=>{
    try{
        let r = await linkModel.findOneAndDelete({linkId:linkId}).exec();
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

const getReferral = async(userId)=>{
    try{

        let r = await referralModel.find({userId:userId}).exec();
        return r[0];
        
    }catch(e){
        console.log(e);
        return false;
    }
}

const getReferralInfoViaToken = async(token)=>{
    try{

        let r = await referralModel.find({referralId:token}).exec();
        return r;
        
    }catch(e){
        console.log(e);
        return false;
    }
}

const addReferralInfo = async(data)=>{
    try{

        let model = new referralModel(data);
        await model.save();
        return true;
        
    }catch(e){
        console.log(e);
        return false;
    }
}

const addReferralClaimInfo = async(data)=>{
    try{

        let model = new referralClaimModel(data);
        await model.save();
        return true;
        
    }catch(e){
        console.log(e);
        return false;
    }
}

const updateUserProfile = async(userId,data)=>{
     try{
         let r = await userModel.findOneAndUpdate({userId:userId},data).exec();
         return true;
     }catch(e){
         return false;
     }
}

const getLinkGenTx = async(txId)=>{
    try{

        let r = await linkGenTxModel.find({txId:txId}).exec();
        if(r.length>0){
            return true;
        }else{
            return false;
        }
        
    }catch(e){
        console.log(e);
        return false;
    }
}
const addLinkGenTx = async(data)=>{
    try{
        let model = new linkGenTxModel(data)
        let r = await model.save();
        return true;
        
    }catch(e){
        console.log(e);
        return false;
    }
}


module.exports = {
    initPreAction,
    insertUser,
    getUser,
    getTopUsers,
    getUserSocialLinksData,
    addUserSocialLinkData,
    updateUserSocialLinkData,
    getLink,
    getUserLinks,
    addUserLink,
    updateUserLink,
    updateUserLinkOrderWeight,
    deleteUserLink,
    getReferral,
    addReferralInfo,
    addReferralClaimInfo,
    getLinkGenTx,
    addLinkGenTx,
    addUserLinkOrder,
    updateUserLinkOrder,
    getUserLinkOrder,
    getUserAppearanceData,
    addUserAppearanceData,
    updateUserAppearanceData,
    getUserByUserName,
    getReferralInfoViaToken,
    updateUserProfile,

}