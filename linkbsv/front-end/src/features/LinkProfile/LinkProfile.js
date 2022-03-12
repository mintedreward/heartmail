import {useEffect,useState} from "react";
import "./styles/linkProfile.css";
import LoadingScreen from "../../repository/components/LoadingScreen/loadingScreen";
import {getUserLinks} from "../../utils/api";
import makeToast from "../../utils/toast";
import CardEmptyLinkProfile from "./components/cardEmptyLinkProfile";
import LinkListView from "./components/linkListView";
import CardProfileInfo from "./components/cardProfileInfo";
import themeStyles from "../../consts/themeStyles";
import SocialMediaButtons from "../../common/components/socialMediaButtons";
import AppLogoText from "../../assets/images/icons/app-logo-txt.svg";

function LinkProfile(props) {

  const userName = props.match.params.userName;
  const [isPageLoading,setPageLoading] = useState(false);
  const [activeView,setActiveView] = useState(null);
  const [linksData,setlinksData] = useState(null);
  const [socialLinksData,setSocialLinksData] = useState(null);
  const [profileData,setProfileData] = useState(null);
  const [appearanceData,setAppearanceData] = useState(null);
  const [linkOrderData,setLinkOrderData] = useState(null);



  const renderActiveView = ()=>{
    switch(activeView){
        case 0:
          return <CardEmptyLinkProfile userName={userName}/>;
          break;
        case 1:
          return <LinkListView links={linksData}/>;
          break;
        default:
          return <span></span>
    }
  }

  useEffect(()=>{

       async function initUserLinks(){
         if(userName){
          setPageLoading(true);
          let r = await getUserLinks(userName);
          if(r){
             if(!r['error']){
                
                if(r['data']['links'].length>0){
                  setlinksData(r['data']['sortedLinks']);
                  setProfileData(r['data']['profile']);
                  setAppearanceData(r['data']['appearance']);
                  setSocialLinksData(r['data']['socialLinks'])
                  setLinkOrderData(r['data']['linkOrder'])
                  setActiveView(1);
                }else{
                  setActiveView(0)
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
         }else{
           window.location.href = "/"
         }
       }

       initUserLinks()

  },[])

  const renderTheme = (themeId)=>{
    switch(themeId.toLowerCase()){
      case "default":
        return themeStyles.themeDefault;
        break;
      case "quepal":
        return themeStyles.quePal;
        break;
      case "moonlitasteroid":
        return themeStyles.moonLitAsteroid;
        break;
      default:
        return themeStyles.themeDefault;
    }
  }

  return (
    <div className="container-fluid container-linkProfile-root"
    style={appearanceData?renderTheme(appearanceData['themeId']):renderTheme("default")}
    
    >
      {
        (isPageLoading)?
          <LoadingScreen/>
        :
          <span></span>
      }
        <div className="row">
          <div className="col col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
          <div className="col col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <div className="pt-5">
              {
                 profileData?
                 <CardProfileInfo themeId={appearanceData?appearanceData['themeId']:"default"} profile={profileData}/>
                 :
                 <span></span>
              }
            </div>
            <div className="pt-5 pb-5">
              {
                renderActiveView(activeView)
              }
            </div>  
          </div>
          <div className="col col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
        </div>
        <div className="row">
          <div className="col col-lg-4 col-md-4 col-sm-4 col-xs-12">
          </div>
          <div className="col col-lg-4 col-md-4 col-sm-4 col-xs-12">
             <div className="text-center">
              <SocialMediaButtons links={socialLinksData}/>
             </div>
          </div>
          <div className="col col-lg-4 col-md-4 col-sm-4 col-xs-12">
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="text-center" style={{
              position:'fixed',
              width:'100%',
              display:'block',
              bottom:'3vh',
              display:'flex',
              alignItems:'center',
              alignContent:'center',
              justifyContent:'center'
            }}>
               <a href="/">
                  <img src={AppLogoText} alt="app-logo" style={{height:'2.4rem'}}/>
               </a>
            </div>
          </div>
        </div>
    </div>
  );
}

export default LinkProfile;
