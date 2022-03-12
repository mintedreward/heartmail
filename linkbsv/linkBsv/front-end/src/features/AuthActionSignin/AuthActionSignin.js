import {useEffect} from "react";

import "./styles/login.css";
import LoginBackground from "./components/LoginBackground";
import LoginBox from "./components/LoginBox";


function AuthAction() {
  
  useEffect(()=>{
    
    localStorage.setItem("authActionRoute",1);

  },[])

  return (
    <div class="login-div">
      <LoginBackground />
      <LoginBox />
    </div>
  );
}

export default AuthAction;
