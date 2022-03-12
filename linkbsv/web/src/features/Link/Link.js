import {useState,useEffect} from "react";

import MobileSection from "../../common/components/MobileSection";
import SideBar from "../../common/components/SibeBar";
import Header from "../../common/components/Header/Header";
import StatBar from "../../common/components/StateBar";
import "./styles/link.css";
import LinkList from "./components/LinkList";
import FormAddLink from "./components/FormAddLink";
import makeToast from "../../utils/toast";
import LoadingScreen from "../../repository/components/LoadingScreen/loadingScreen";

import {addUserLink,getUserLinks,deleteUserLink} from "../../utils/api";
import handCashController from "../../controllers/handcashController";
import moneyButtonController from "../../controllers/moneyButtonController";
import Helmet from "react-helmet";


function Link() {

  const [activeView,setActiveView] = useState(0);
  const [isPageLoading,setPageLoading] = useState(false);
  const [linksData,setlinksData] = useState(null);
  const [socialLinksData,setSocialLinksData] = useState(null);
  const [appearanceData,setAppearanceData] = useState(null);
  const [linkOrderData,setLinkOrderData] = useState(null);

  const renderActiveView = ()=>{
      switch(activeView){
        case 0:
          return <LinkList links={linksData} onClickAddLink={()=>setActiveView(1)} onDeleteLink={onDeleteLink} />;
          break;
        case 1:
          return <FormAddLink onLinkAdd={onLinkAdd} onClickBack={()=>setActiveView(0)}/>
          break;
        default:
          return <span></span>
      }
  }


  const onDeleteLink = async(linkId)=>{
        setPageLoading(true);
        let r = await deleteUserLink({linkId:linkId,userId:localStorage.getItem("userId")});
        if(r){
          if(!r['error']){
             makeToast("Link deleted successfully","success");
             window.location.reload();
          }else{
            makeToast(r['body']['message'],"error")
          }
        }else{
          makeToast("Opps! something went wrong","error");
        }
        setPageLoading(false);
  }

  const onLinkAdd = async(linkTitle,linkUrl,description)=>{
        
        setPageLoading(true);
        

        let txId = (parseInt(localStorage.getItem("authType"))===0)? await handCashController.sendLinkCreationFee() : await moneyButtonController.sendLinkCreationFee();
        if(txId){

          let payload = {
            userId : localStorage.getItem("userId"),
            title : linkTitle,
            description: description,
            url : linkUrl,
            thumbnailUrl : "__",
            txId : txId
          }
          let r = await addUserLink(payload);
          if(r){
            if(!r['error']){
              makeToast("Link Added Successfully","success");
              window.location.reload();
            }else{
              makeToast(r['body']['message'],"error");
            }
          }else{
            makeToast("Opps! something went wrong","error");
          }
          
        }else{
           makeToast("Error : Payment failed","error");
        }
        setPageLoading(false);
  }

  useEffect(()=>{

    async function initUserLinks(){
       setPageLoading(true);
       let r = await getUserLinks(localStorage.getItem("userName"));
       if(r){
          if(!r['error']){
             
             if(r['data']['links'].length>0){
               setlinksData(r['data']['sortedLinks']);
               setAppearanceData(r['data']['appearance']);
               setSocialLinksData(r['data']['socialLinks']);
               setLinkOrderData(r['data']['linkOrder'])
               
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
        (isPageLoading)?
        <LoadingScreen/>
        :
        <span></span>
      }
      <SideBar />
      <div class="admin-content-area">
      <Helmet>
          <script src="https://www.moneybutton.com/moneybutton.js"></script>
      </Helmet>
        <Header linkName="link" />
        <div class="admin-content pt-3 pr-5 pb-5 pl-5">
          <div className="header pb-4">
            <div className="pb-5">
              <StatBar />
            </div>
          </div>
          <div className="body">
          {
          
            renderActiveView(linksData)
            
          }
          </div>
          <MobileSection socialLinks={socialLinksData} links={linksData} themeId={appearanceData?appearanceData['themeId']:null} />
        </div>
      </div>
    </>
  );
}

export default Link;
