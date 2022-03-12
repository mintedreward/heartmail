import {useState,useEffect} from 'react';
import {addUserSocialLink,updateUserSocialLink} from "../../../utils/api";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const FormInput = (props)=>{
   const [url,setUrl] = useState(null);
   const [apiLog,setApiLog] = useState(null);
   const [apiCallState,setApiCallState] = useState(false);
   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
   const [routeAction,setRouteAction] = useState(0);


   const onAddLink = async()=>{
       if(url && url.trim().length>0){
           setApiCallState(true);
          let payload = {
              userId : localStorage.getItem("userId"),
              url : url,
              platform : props.platform.toLowerCase()
          }
          let r = (routeAction === 0)?await addUserSocialLink(payload): await updateUserSocialLink(payload);
          if(r){
              if(!r['error']){
                 setApiLog(<span class="text-success" role="alert">Updated Successfully</span>);
                 setRouteAction(1);
              }else{
                setApiLog(<span class="text-danger" role="alert">{r['body']['message']}</span>);

              }

          }else{
            setApiLog(<span class="text-danger" role="alert">Opps! something went wrong</span>);
          }
          setApiCallState(false);
       }
   }

   useEffect(()=>{
     
       if(props.url){
          setUrl(props.url);
          setRouteAction(1);
       }

   },[props.url])

   return (
       <div>
           <div className="inputWrapper p-2"
           style={{
               
               borderBottom : '1px solid rgba(0,0,0,0.2)',
               borderRadius:'0rem'
           }}
           >
               <div className="row">
                   <div className="col col-lg-11 col-md-11 col-sm-11 col-xs-11">
                                <input 
                                value={url}
                                style={{border:'none',display:'inline-block',width:'100%',fontSize:'16px'}}
                                type="text" 
                                placeholder={props.placeholder}  
                                onBlur={onAddLink}
                                onChange={(e)=>{setUrl(e.target.value);setApiLog(null)}}
                                
                                />

                   </div>
                   <div className="col col-lg-1 col-md-1 col-sm-1 col-xs-1">
                        <div className="text-center">
                            {
                                apiCallState?
                                <Spin indicator={antIcon} />
                                :
                                <span></span>
                            }
                        </div>

                   </div>
               </div>
           </div>
           <div className="log pt-2 pl-2">
               {apiLog}
           </div>
       </div>
   )
}

export default FormInput;