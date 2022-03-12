const {getTopUsers,updateUserProfile} = require("../helpers/db_helper");
const {validateProfileUpdateReq} = require("../validators/profile_validator")
const errors = require("../consts/errors");

const Controller = {

     async getTopUsers(req,res){
         let users = await getTopUsers();
         if(users){
             _handleResponse(res,null,{
                error : false,
                data : users
            })

         }else{
           _handleResponse(res,500);
         }

     },
     async updateUserProfileData(req,res){
      let {userId,paymail} = await validateProfileUpdateReq(req.body);
      try{
        let r = await updateUserProfile(userId,{userPaymail:paymail});
        if(r){
           _handleResponse(res,null,{
             error : false,
             data : {
               userPaymail : paymail
             }
           })
        }else{
          _handleResponse(res,null,{
            error : true,
            code : errors.updateUserProfileError.code,
            message : errors.updateUserProfileError.message
          })
        }

      }catch(e){

      }

  }

}

module.exports = Controller