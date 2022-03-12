import {useState} from 'react';
import {getAuthState} from "../../../utils/api"

function StartHere() {

  const [userName,setUserName] = useState(null);
  const [isAvailableUserName,setIsAvailableUserName] = useState(false);
  const [apiLog,setApiLog] = useState(null);

  const onGo = ()=>{
    if( userName && userName.trim().length>0 && isAvailableUserName){
      window.location.href = `/auth/signup?userName=${userName}`
    }else{
      window.location.href = `/auth/signup`
    }
  }
  const getUserAuthState = async(userName)=>{
      let r = await getAuthState(userName);
      if(r){
         if(!r['error']){
            if(r['data']['authState'] === 0){
              setIsAvailableUserName(true);
              setApiLog(<span class="text-success" role="alert">Username Available!</span>);
              
            }else{
              setIsAvailableUserName(false);
              setApiLog(<span class="text-danger" role="alert">Username not available!</span>) 
              localStorage.removeItem("userName");

            }
         }else{
           setApiLog(<span class="text-danger" role="alert">{r['body']['message']}</span>) 
           localStorage.removeItem("userName");
         }
      }else{
         setApiLog(<span class="text-danger" role="alert">Opps!Something went wrong</span>)
         localStorage.removeItem("userName");
      }
  }

  return (
    <section class="starthere">
      <div class="starthere-div text-center">
        <span className="mr-2" style={{color:'rgba(0,0,0,1)',fontWeight:'600'}}>linkbsv.com/</span>
        <input type="text" class="search" placeholder="username"
        onChange={(e)=>{
          let userName = e.target.value;
          if(userName.trim().length>0){
            setUserName(userName);
            getUserAuthState(userName)
          }else{
            setApiLog(null)
          }
        }}
        />
        <button class="orgbtn" onClick={onGo}>Go</button>
      </div>
      {
          <div className="text-center">
            {apiLog}
          </div>
        }
    </section>
  );
}

export default StartHere;
