import {useState} from 'react';
import {getAuthState} from "../../../utils/api"

function AuthForm() {

  const [apiLog,setApiLog] = useState(null);

  const getUserAuthState = async(userName)=>{
      let r = await getAuthState(userName);
      if(r){
         if(!r['error']){
            if(r['data']['authState'] === 0){
              setApiLog(<span class="text-success" role="alert">Username Available!</span>);
              localStorage.setItem("userName",userName);
            }else{
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
     <div className="w-100 text-center">
       <div className="text-left  pt-3 pb-3 pl-3 pr-3"
       style={{
        border : '1px solid rgba(0,0,0,0.9)',
        borderRadius:'2.5rem',
       }}
       >
         <span
         className="pr-1"
         style={{
           fontSize:'18px',
           color:'rgba(0,0,0,0.3)'
         }}
         >
         linkbsv.com/
         </span>
         <span style={{display:'inline'}}>
          <input type="text" 
          style={{
            display:'inline',
            border : '0px',
            fontSize:'18px'
          }}
          onChange={(e)=>{
            if(e.target.value.trim().length>0){
              getUserAuthState(e.target.value)
            }else{
              setApiLog(null)
            }
          }}
          placeholder="username"
          
          />

         </span>
       </div>
       <div className="pt-1">
         {apiLog}
       </div>
     </div>
  );
}

export default AuthForm;