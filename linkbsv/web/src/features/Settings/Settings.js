import {useState,useEffect} from 'react';

import MobileSection from "../../common/components/MobileSection";
import SideBar from "../../common/components/SibeBar";
import Header from "../../common/components/Header/Header";
import "./styles/settings.css";
import MySetting from "./components/MySetting";
import SocialMediaForm from "./components/SocialMediaForm";

import LoadingScreen from "../../repository/components/LoadingScreen/loadingScreen";
import makeToast from "../../utils/toast";

import {getUserLinks} from "../../utils/api";

import {Settings,Share} from "@material-ui/icons"



function Link() {

  const [isPageLoading,setPageLoading] = useState(false);
  const [userLinksData,setUserLinksData] = useState(null);
  const [socialLinksData,setUserSocialLinksData] = useState(null);
  const [appearanceData,setUserAppearanceData] = useState(null);
  const [userReferralLink,setUserReferralLink] = useState(null);
  const [linkOrderData,setLinkOrderData] = useState(null);

  useEffect(()=>{
    
   async function initUserLinksData(){
       setPageLoading(true);
       let r = await getUserLinks(localStorage.getItem("userName"));
       if(r){
         if(!r['error']){
            setUserLinksData(r['data']['sortedLinks']);
            setUserAppearanceData(r['data']['appearance'])
            setUserSocialLinksData(r['data']['socialLinks']);
            setUserReferralLink(r['data']['referralLink'])
            setLinkOrderData(r['data']['linkOrderData']);
         }else{
           makeToast(r['body']['message'])
         }
       }else{
         makeToast("Opps! something went wrong");
       }
       setPageLoading(false);
   }
    initUserLinksData();

  },[])


  return (
    <>
      {
        isPageLoading?
        <LoadingScreen/>
        :
        <span></span>
      }
      <SideBar />
      <div class="admin-content-area">
        <Header linkName="setting" />
        <div class="admin-content p-5">
          <div className="header" style={{display:'flex',justifyContent:"center",flexDirection:'column'}}>
            <div className="pb-4">
              <h3 style={{fontSize: '24px', fontWeight: 'bold'}}><Settings style={{color:'rgba(4,54,115,1)'}}/> My Settings</h3>
            </div>
            <div className="p-5" style={{boxShadow:'0px 0px 15px rgba(0,0,0,0.08)',borderRadius:'1rem'}}>
                <span className="mr-2" style={{fontSize:'16px',fontWeight:'600'}}>
                My referral link : 
                </span>
                <span className="mr-2">
                  <a 
                    href={`https://linkbsv.com/auth/signup?ref=${userReferralLink}`}
                    style={{
                      color:'rgba(0,0,0,0.8)',
                      textDecoration:'underline',
                      letterSpacing:'2px'
                    }}
                  >
                    {`https://linkbsv.com/auth/signup?ref=${userReferralLink}`}
                  
                  </a>
                </span>
                <span>
                  <Share style={{color:'rgba(4,54,115,1)',cursor:'pointer'}}/>
                </span>
            </div>
          </div>
          <div>
            <SocialMediaForm links={socialLinksData} />
          </div>
          <MobileSection socialLinks={socialLinksData} links={userLinksData} themeId={appearanceData?appearanceData['themeId']:null}/>
        </div>
      </div>
    </>
  );
}

export default Link;
