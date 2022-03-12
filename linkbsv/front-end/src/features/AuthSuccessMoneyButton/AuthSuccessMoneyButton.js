import React,{useState,useEffect} from 'react';
import LoadingScreen from "../../repository/components/LoadingScreen/loadingScreen";
import makeToast from "../../utils/toast";
import {MoneyButtonClient} from "@moneybutton/api-client";
import configs from "../../consts/configs";
import {createMnemonics} from "../../utils/bsv";
import {doSignUp,doSignIn} from "../../utils/api";

const client = new MoneyButtonClient(configs.moneyButtonClientOauthId);



const AuthSuccess = ()=>{

    const [isPageLoading,setPageLoading] = useState(false);


    useEffect(()=>{
         async function initAuth(){
            setPageLoading(true);
            try{
                await client.handleAuthorizationResponse();
                const { id: userId } = await client.getIdentity();
                const p = await client.getUserProfile(userId);
                

                let mnemonics = createMnemonics();
                let r = (localStorage.getItem("authActionRoute") == 0)?
                        await doSignUp({
                            userId :userId,
                            encMnemonics : mnemonics,
                            userName:localStorage.getItem("userName"),
                            avatarUrl:p['avatarUrl'],
                            referrer : localStorage.getItem("referralToken")

                        })
                    :
                        await doSignIn({userId :userId});
                if(!r){
                   setPageLoading(false);
                   makeToast("Oops !! Something went wrong","error");
                }else{
                    if(r['error']){
                        setPageLoading(false);
                        makeToast(r['body']['message'],"error");
                    }else{
                         localStorage.setItem("authType",1);
                         localStorage.setItem("userId",userId);
                         localStorage.setItem("userHandle",p['name']);
                         localStorage.setItem("moneyButtonUserName",p['name']);
                         localStorage.setItem("avatarUrl",p['avatarUrl']);
                         localStorage.setItem("acMnemonics",r['data']['encMnemonics']);
                         localStorage.setItem("userName",r['data']['userName']);
                         localStorage.setItem("paymail",p['primary-paymail']);


                         localStorage.removeItem("authActionRoute");

                
                        window.location.href = "/account/dashboard";
                    }
                
             }

            }catch(e){
               setPageLoading(false);
               console.log(e);
               makeToast("Opps! Something went wrong","error")
            }


         }
      
      initAuth()

    },[])

   return (
   
        <div className="container-fluid container-authSuccess-moneybutton-root p-0">
            {
                    (isPageLoading)?
                        <LoadingScreen/>
                        :
                        <span></span>
                }
        </div>
    )
    
}

export default AuthSuccess;