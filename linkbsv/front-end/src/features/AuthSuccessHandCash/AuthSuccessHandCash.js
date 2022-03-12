import React,{useState,useEffect} from 'react'
import LoadingScreen from "../../repository/components/LoadingScreen/loadingScreen";
import handcashController from "../../controllers/handcashController";
import {useLocation} from "react-router-dom";
import queryString from "query-string";
import {createMnemonics} from "../../utils/bsv";
import {doSignUp,doSignIn} from "../../utils/api";
import makeToast from "../../utils/toast";

const AuthSuccess = ()=>{

    const {search} = useLocation();
    const {authToken} = queryString.parse(search);

    const [isPageLoading,setPageLoading] = useState(false);

    const initReg = async ()=>{
        setPageLoading(true);

        localStorage.setItem("handCashAuthToken",authToken);

        let p = await handcashController.getProfile();
        let mnemonics = createMnemonics();
        
        let r = (localStorage.getItem("authActionRoute") == 0)? 
                    await doSignUp({
                        userId : p['id'],
                        userHandleHandCash : p['handle'],
                        userName : localStorage.getItem("userName"),
                        encMnemonics : mnemonics,
                        avatarUrl:p['avatarUrl'],
                        referrer : localStorage.getItem("referralToken")
                    })
                :
                    await doSignIn({userId : p['id']});
        if(!r){
         setPageLoading(false);
         makeToast("Oops !! Something went wrong","error");
         localStorage.clear();
        }else{
            if(r['error']){
                setPageLoading(false);
                makeToast(r['body']['message'],"error");
                localStorage.clear();
            }else{
                localStorage.setItem("authType",0);
                localStorage.setItem("userId",p['id']);
                localStorage.setItem("userHandle",p['handle']);
                localStorage.setItem("handCashUserName",p['displayName']);
                localStorage.setItem("avatarUrl",p['avatarUrl']);
                localStorage.setItem("acMnemonics",r['data']['encMnemonics']);
                localStorage.setItem("userName",r['data']['userName']);
                localStorage.setItem("paymail",p['paymail'])


                localStorage.removeItem("authActionRoute");
        
                window.location.href = "/account/dashboard";
            }
        
    }


        
     }

    useEffect(()=>{

         initReg();
    },[])

    return (
        <div className="container-fluid container-authSuccess-handcash-root p-0">
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