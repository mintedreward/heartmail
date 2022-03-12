import {useState,useEffect} from 'react';
import CommunityArea from "./community/CommunityArea";
import Introduction from "./Introduction";
import SocialBox from "./SocialBox";
import StartHere from "./StartHere";

import {getTopUsers} from "../../../utils/api"



function ContentArea() {

  const [topUsersData,setTopUsersData] = useState(null);

  useEffect(()=>{
         async function initTopUsersData(){
              let r = await getTopUsers();
              if(r){
                if(!r['error']){
                    setTopUsersData(r['data']);
                }
              }
         }
         initTopUsersData();
  },[])


  return (
    <div class="content-area">
      <SocialBox />
      <div style={{paddingBottom:'14rem'}}>
        <StartHere />
      </div>
      <Introduction />
      <div className="pb-5 mb-5">
        <CommunityArea users={topUsersData}/>
      </div>
    </div>
  );
}

export default ContentArea;
