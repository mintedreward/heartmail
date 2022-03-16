import {useState,useEffect} from 'react';

import ListItemLink from "./listItemLink";
import "../styles/mobileView.css";
import UserAvatar from "../../repository/components/userAvatar/userAvatar";
import themeStyles from "../../consts/themeStyles";
import SocialMediaButtons from "../../common/components/socialMediaButtons"
import { merge } from 'lodash-es';


function MobileSection(props) {

  const [renderedLinks,setRenderedLinks] = useState(null);

  const renderLinks = () => {
    let i;
    let j;

    let sorted = [];
    let unOrdered = [];
    
    if(props.linkOrder){

      let linkOrder = JSON.parse(props.linkOrder);
  
      for (i=0;i<linkOrder.length;i++){
          for(j=0;j<props.links.length;j++){
            if(linkOrder[i] == props.links[j]['linkId']){
              sorted.push(props.links[j]);
            }else{
              unOrdered.push(props.links[j]);
            }
          }
      }


    }else{
      sorted = props.links;
    }


    setRenderedLinks(merge(sorted,unOrdered));
  }

  useEffect(()=>{
     renderLinks()
  },[props.links,props.linkOrder])



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
    <div class="admin-content-right">
      <h3 style={{fontSize:"15px"}}>
        <span style={{fontWeight:'bold'}}>My link :</span><span><a target="_blank" style={{color:"rgba(0,0,0,0.8)",textDecoration:'underline',letterSpacing:'2px'}} href={`https://linkbsv.com/${localStorage.getItem("userName")}`}>{`https://linkbsv.com/${localStorage.getItem("userName")}`}</a></span>
      </h3>
      <div class=" text-center">
        <div className="p-4" style={{display:'flex',alignContent:'center',justifyContent:'center'}}>
           <div className="mobile-view-container" 
            style={
              
              {
              height:'70vh',
              width:'350px',
              borderRadius:'40px',
              border:'12px solid rgba(0,0,0,1)',
              ...props.themeId?renderTheme(props.themeId):renderTheme("default")
              

            }}

           >
             <div
             style={{
             }}
             >
                <div className="header p-5">
                  
                   <UserAvatar avatarUrl={localStorage.getItem("avatarUrl")}/>
                
                   <div className="pt-2">
                     <span style={{color:'rgba(0,0,0,1)'}}>
                       {`@${localStorage.getItem("userName")}`}
                     </span>
                   </div>
                </div>
                <div className="body p-4" style={{

                  overflowY:'scroll',
                  overflowX:'hidden',
                  height:'42vh',

                  
                  }}>
                   {
                     renderedLinks && renderedLinks.length>0?
                     renderedLinks.map(link=>{
                      return (
                        <div className="mb-3">
                               <ListItemLink link={link}/>
                      
                        </div>
                      )
                    })
                    :
                    <span></span>
                        
                   }
                    <div className="p-4">
                        <SocialMediaButtons links={props.socialLinks}/>
                    </div>
                </div>

             </div>
           </div>
        </div>
      </div>
      <div class="right-social">

      </div>
    </div>
  );
}

export default MobileSection;
