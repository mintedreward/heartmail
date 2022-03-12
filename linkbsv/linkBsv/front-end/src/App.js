import React,{useEffect, lazy,Suspense} from 'react';import { BrowserRouter } from "react-router-dom";
import "./assets/styles/style.css";
import 'antd/dist/antd.css';


import { Switch, Route, Redirect } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import LoadingScreen from "./repository/components/LoadingScreen/loadingScreen"
import {updateUserProfileInfo} from "./utils/api";
import {isSignedIn} from "./utils/auth";

const Home = lazy(()=>import("./features/Home/Home"))
const AuthActionSignin = lazy(()=>import("./features/AuthActionSignin/AuthActionSignin"));
const AuthActionSignUp = lazy(()=>import("./features/AuthActionSignUp/AuthActionSignUp"));
const LinkProfile = lazy(()=>import("./features/LinkProfile/LinkProfile"));
const Link = lazy(()=>import("./features/Link/Link"));
const Appearance = lazy(()=>import("./features/Appearance/Appearance"));
const Settings = lazy(()=>import("./features/Settings/Settings"));
const AuthSuccessHandCash = lazy(()=>import("./features/AuthSuccessHandCash/AuthSuccessHandCash"));
const AuthSuccessMoneyButton = lazy(()=>import("./features/AuthSuccessMoneyButton/AuthSuccessMoneyButton"));




function App() {
 
  useEffect(()=>{
    window.scrollTo(0, 0);

    async function initStartupConfigs(){
      if(isSignedIn() && localStorage.getItem("paymail") && localStorage.getItem("paymail").length>0){
          let payload = {
            userId : localStorage.getItem("userId"),
            paymail : localStorage.getItem("paymail")
          }
           updateUserProfileInfo(payload);
      }

    }




    initStartupConfigs()



  },[])

  return (
    <Suspense  fallback={<LoadingScreen/>}>
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} exact />
            <Route exact path="/auth/signin" component={AuthActionSignin} exact />
            <Route exact path="/auth/signup" component={AuthActionSignUp} exact />
            <Route exact path="/auth/handcash/success" component={AuthSuccessHandCash} exact />
            <Route exact path="/auth/moneybutton/success" component={AuthSuccessMoneyButton} exact />
            <Route exact path="/:userName" component={LinkProfile} exact />
            <Route exact path="/account/dashboard" component={Link} exact />
            <Route exact path="/account/appearance" component={Appearance} exact />
            <Route exact path="/account/settings" component={Settings} exact />
            <Redirect from="*" to="/" />
          </Switch>
      </BrowserRouter>
      <ToastContainer/>  
    </Suspense>
  );
}

export default App;
