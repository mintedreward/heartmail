import {useState,useEffect} from 'react';
import CardThemeDefault from "./themes/CardThemeDefault";
import CardThemeMoonlitAsteroid from "./themes/cardThemeMoonlitAsteroid";
import CardThemeQuePal from "./themes/cardThemeQuePal";
import {updateUserAppearanceInfo} from "../../../utils/api";
import LoadingScreen from "../../../repository/components/LoadingScreen/loadingScreen";
import makeToast from '../../../utils/toast';

function Theme(props) {
  
  const [activeTheme,setActiveTheme] = useState("default");
  const [isPageLoading,setPageLoading] = useState(false);

  const onSelectTheme = async(themeId)=>{
      let previousActiveTheme = activeTheme;
      setActiveTheme(themeId);
      setPageLoading(true);
      let r = await updateUserAppearanceInfo({userId:localStorage.getItem("userId"),themeId:themeId});
      if(r){
         if(!r['error']){
           setActiveTheme(themeId);
           window.location.reload();

         }else{
           makeToast("Error switching theme","error");
           setActiveTheme(previousActiveTheme);
         }
      }else{
         makeToast("Opps! something went wrong");
         setActiveTheme(previousActiveTheme);
      }
      setPageLoading(false);

  }

  useEffect(()=>{
     if(props.appearanceData){
       setActiveTheme(props.appearanceData['themeId']);
     }

  },[props.appearanceData])


  return (
    <>
      {
        isPageLoading?
        <LoadingScreen/>
        :
        <span></span>
      }
      <div className="pb-5">
         <h2 style={{fontSize:'28px',fontWeight:'500',color:'rgba(2,41,89,1)'}}>Themes</h2>
      </div>
      <div class="row">
        <div className="col col-lg-12 col md-12 col-sm-12 col-xs-12 p-0">
          <div className="p-1" 
          style={{
             //boxShadow:'0px 0px 15px rgba(0,0,0,0.2)'
          }}>
              <div className="row">
                <div className="col col-lg-4 col-md-4 col-sm-4 col-xs-12 p-0">
                  <CardThemeDefault onSelect={onSelectTheme} selected={activeTheme.toLowerCase()=="default"}/>
                </div>
                <div className="col col-lg-4 col-md-4 col-sm-4 col-xs-12 p-0">
                  <CardThemeQuePal onSelect={onSelectTheme} selected={activeTheme.toLowerCase()=="quepal"}/>
                </div>
                <div className="col col-lg-4 col-md-4 col-sm-4 col-xs-12 p-0">
                  <CardThemeMoonlitAsteroid onSelect={onSelectTheme} selected={activeTheme.toLowerCase()=="moonlitasteroid"}/>
                </div>

              </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Theme;
