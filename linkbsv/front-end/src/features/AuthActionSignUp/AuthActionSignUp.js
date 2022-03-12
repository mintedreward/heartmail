import {useEffect,useState} from "react";

import "./styles/signup.css";
import bgImage from "./assets/images/login.svg";
import {useLocation} from "react-router-dom";
import queryString from "query-string";
import UserImage from "./components/userImage";
import AuthFormSignUp from "./components/AuthFormSIgnup";
import ConnectButtons from "./components/ConnectButtons";
 

function AuthAction() {
  const {search} = useLocation();
  const {ref,userName} = queryString.parse(search);
  const [validatedUserName,setValidatedUserName] = useState(false);


  useEffect(()=>{

    localStorage.setItem("authActionRoute",0);

    if(userName && userName.trim().length>0){
       setValidatedUserName(userName);
       localStorage.setItem("userName",userName);
    }else{
    }
     
    if(ref && ref.trim().length>0){
       localStorage.setItem("referralToken",ref)
    }

  },[])

  return (
    <div 
    className="p-lg-5"
    style={{
      backgroundImage:`url(${bgImage})`,
      backgroundPosition:'10% 0%',
      backgroundRepeat:'no-repeat',
      backgroundSize:'fill',
      maxWidth:'100vw',
      height:'100vh',
      overflow:'hidden',
      maxHeight:'100vh',
    }}>
      <div className="row">
      <div className="col col-lg-4 col-md4 col-sm-4 col-xs-12"></div>
        <div className="col col-lg-8 col-md4 col-sm-8 col-xs-12">
          <div
          className="mt-5"
          style={{
            display:'flex',
            justifyContent:'center',
            flex:'1',
            flexDirection:"column"
          }}
          >
              <div className="header pt-5 pb-4 text-center">
                <div className="pb-3">
                  <UserImage/>
                </div>
                <h3 
                className="text-center"
                style={{
                  fontSize:"24px",
                  fontWeight:'600'
                }}
                
                >Welcome User</h3>
              </div>
              <div>
                <div className="row">
                  <div className="col col-lg-3 col-md-3 col-sm-3 col-xs-12"></div>
                  <div className="col col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      {
                        validatedUserName?
                        <span></span>
                        :
                        <AuthFormSignUp/>
                      }
                  </div>
                  <div className="col col-lg-3 col-md-3 col-sm-3 col-xs-12"></div>
                </div>
              </div>
              <div className="text-center pt-4">
                <div className="row">
                  <div className="col col-lg-3 col-md-3 col-sm-3 col-xs-12"></div>
                  <div className="col col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <ConnectButtons/>
                  </div>
                  <div className="col col-lg-3 col-md-3 col-sm-3 col-xs-12"></div>
                </div>
              </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthAction;
