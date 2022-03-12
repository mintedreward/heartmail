import configs from "../consts/configs";

    const doSignOut = ()=>{
        try{
            localStorage.clear();
            return true;
        }catch(e){
            return false;
        }

    }

    const doSignUp = async(payload)=>{

       try{
        let response = await fetch(configs.serverUrl+"/auth/signup",{
                            method : "POST",
                            headers : {
                                "Content-type":"application/json"
                            },
                            body : JSON.stringify(payload)
                        });
         let json = await response.json();
         return json;
       }catch(e){
           return false;
       }

    }

    const doSignIn = async(data)=>{

        let payload = {
            userId : data['userId'],
        }
    
       try{
        let response = await fetch(configs.serverUrl+"/auth/signin",{
                            method : "POST",
                            headers : {
                                "Content-type":"application/json"
                            },
                            body : JSON.stringify(payload)
                        });
         let json = await response.json();
         return json;
       }catch(e){
           return false;
       }

    }

    const getAuthState = async(userName)=>{
    
       try{
         let response = await fetch(`${configs.serverUrl}/auth/state?userName=${userName}`);
         let json = await response.json();
         return json;
       }catch(e){
           return false;
       }

    }

    const getUserAppearanceInfo = async(userId)=>{
        
        try{
          let response = await fetch(`${configs.serverUrl}/appearance/user/get?userId=${userId}`);
          let json = await response.json();
          return json;
        }catch(e){
            return false;
        }
 
     }
     const addUserAppearanceInfo = async(payload)=>{
        
        try{
            let response = await fetch(`${configs.serverUrl}/appearance/user/add`,{
                                method : "POST",
                                headers : {
                                    "Content-type":"application/json"
                                },
                                body : JSON.stringify(payload)
                            });
             let json = await response.json();
             return json;
           }catch(e){
               return false;
           }
 
     }
     const updateUserAppearanceInfo = async(payload)=>{
        
        try{
            let response = await fetch(`${configs.serverUrl}/appearance/user/update`,{
                                method : "POST",
                                headers : {
                                    "Content-type":"application/json"
                                },
                                body : JSON.stringify(payload)
                            });
             let json = await response.json();
             return json;
           }catch(e){
               return false;
           }
 
     }

     const updateUserProfileInfo = async(payload)=>{
        

        
        try{

          let response = await fetch(`${configs.serverUrl}/user/profile/update`,{
              method : "POST",
              headers : {
                  "Content-type" : "application/json"
              },
              body : JSON.stringify(payload)
          });
          let json = await response.json();
          return json;
        }catch(e){
            console.log(e);
            return false;
        }
 
     }


     const getTopUsers = async()=>{
        
        try{
          let response = await fetch(`${configs.serverUrl}/user/top/get/all`);
          let json = await response.json();
          return json;
        }catch(e){
            return false;
        }
 
     }

    const getUserLinks = async(userName)=>{
        
        try{
          let response = await fetch(`${configs.serverUrl}/link/user/get/all?userName=${userName}`);
          let json = await response.json();
          return json;
        }catch(e){
            return false;
        }
 
     }


     const addUserLink = async(payload)=>{
        
        try{
         let response = await fetch(`${configs.serverUrl}/link/user/add`,{
                             method : "POST",
                             headers : {
                                 "Content-type":"application/json"
                             },
                             body : JSON.stringify(payload)
                         });
          let json = await response.json();
          return json;
        }catch(e){
            return false;
        }
    }

    const updateUserLink = async(payload)=>{
        
        try{
         let response = await fetch(`${configs.serverUrl}/link/user/update`,{
                             method : "POST",
                             headers : {
                                 "Content-type":"application/json"
                             },
                             body : JSON.stringify(payload)
                         });
          let json = await response.json();
          return json;
        }catch(e){
            return false;
        }
    }

    const updateUserLinkOrder = async(payload)=>{
        
        try{
         let response = await fetch(`${configs.serverUrl}/link/user/order/update`,{
                             method : "POST",
                             headers : {
                                 "Content-type":"application/json"
                             },
                             body : JSON.stringify(payload)
                         });
          let json = await response.json();
          return json;
        }catch(e){
            return false;
        }
    }

    const deleteUserLink = async(payload)=>{
        
        try{
         let response = await fetch(`${configs.serverUrl}/link/user/delete`,{
                             method : "POST",
                             headers : {
                                 "Content-type":"application/json"
                             },
                             body : JSON.stringify(payload)
                         });
          let json = await response.json();
          return json;
        }catch(e){
            return false;
        }
    }
    const getUserSocialLinks = async(userId)=>{
        
        try{
          let response = await fetch(`${configs.serverUrl}/settings/user/social/get/all?userId=${userId}`);
          let json = await response.json();
          return json;
        }catch(e){
            return false;
        }
 
     }
     const addUserSocialLink = async(payload)=>{
        
        try{
          let response = await fetch(`${configs.serverUrl}/settings/user/social/add`,{
              method : "POST",
              headers : {
                  "Content-type" : "application/json"
              },
              body : JSON.stringify(payload)
          });
          let json = await response.json();
          return json;
        }catch(e){
            return false;
        }
 
     }
     const updateUserSocialLink = async(payload)=>{
        
        try{
          let response = await fetch(`${configs.serverUrl}/settings/user/social/update`,{
              method : "POST",
              headers : {
                  "Content-type" : "application/json"
              },
              body : JSON.stringify(payload)
          });
          let json = await response.json();
          return json;
        }catch(e){
            return false;
        }
 
     }

export {
    doSignUp,
    doSignIn,
    doSignOut,
    getTopUsers,
    getAuthState,
    getUserLinks,
    addUserLink,
    updateUserLink,
    updateUserLinkOrder,
    deleteUserLink,
    getUserSocialLinks,
    addUserSocialLink,
    updateUserProfileInfo,
    updateUserSocialLink,
    getUserAppearanceInfo,
    addUserAppearanceInfo,
    updateUserAppearanceInfo

}