import {useState,useEffect} from 'react';
import SideBar from "../../common/components/SibeBar";
import Header from "../../common/components/Header/Header";
import MobileSection from "../../common/components/MobileSection";
import {getUserLinks} from "../../utils/api"

import "./styles/appearance.css";
import Theme from "./components/Theme";
import MyProfile from "./components/MyProfile";
import StatBar from "../../common/components/StateBar"

import makeToast from "../../utils/toast";
import LoadingScreen from "../../repository/components/LoadingScreen/loadingScreen";




function Appearance() {

  const [isPageLoading,setPageLoading] = useState(false);
  const [linksData,setLinksData] = useState(null);
  const [socialLinksData,setSocialLinksData] = useState(null)
  const [appearanceData,setAppearanceData] =  useState(null);
  const [linkOrderData,setLinkOrderData] =  useState(null);

  useEffect(()=>{

    async function initUserLinks(){
       setPageLoading(true);
       let r = await getUserLinks(localStorage.getItem("userName"));
       if(r){
          if(!r['error']){
             
             if(r['data']['links'].length>0){
               setLinksData(r['data']['sortedLinks']);
               setAppearanceData(r['data']['appearance']);
               setSocialLinksData(r['data']['socialLinks']);
               setLinkOrderData(r['data']['linkOrder']);
               
             }
             setPageLoading(false);
             
          }else{
            setPageLoading(false);
            makeToast(r['body']['message'],"err")
          }
       }else{
         setPageLoading(false);
         makeToast("Opps! Something went wrong","error");
       }
    }

    initUserLinks()

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
        <Header linkName="appearance" />
        <div class="admin-content pt-3 pr-5 pb-5 pl-5">
        <div className="header pb-4">
            <div className="pb-5">
              <StatBar />
            </div>
          </div>
          <div className="pb-5">
            <MyProfile />
          </div>
          <Theme appearanceData={appearanceData}/>
          <div class="admin-content-right">
            <MobileSection socialLinks={socialLinksData} links={linksData} themeId={appearanceData?appearanceData['themeId']:null} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Appearance;
