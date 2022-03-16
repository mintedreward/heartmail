import {useState} from 'react';
import {Link,MoreVert,Delete} from "@material-ui/icons"
import { Popover } from 'antd';

const Item = (props)=>{
  
  const [popOverVisibility,setPopOverVisibility] = useState(false);

  return (
      <div className="container-linkItem-root p-3"
      style={{
          backgroundColor:'rgba(255,255,255,1)',
          color:'rgba(0,0,0,0.8)',
          boxShadow:'0px 0px 20px rgba(0,0,0,0.2)',
          borderRadius:'12px'
      }}
      
      >
          <div className="row">
              <div className="col col-lg-1 col-md-1 col-sm-1 col-xs-1">
                {
                  (props.link['thumbnailUrl'] !== "__")?
                  <img src={props.link['thumbnailUrl']}/>
                  :
                  <Link/>
                }
              </div>
              <div className="col col-lg-10 col-md-10 col-sm-2 col-xs-10">
                  <div className="text-left">
                      <div className="pb-2">
                          <span style={{fontWeight:'bold'}}>
                              {props.link['title']}
                          </span>
                      </div>
                      <div>
                          <span style={{fontSize:'13px',color:'rgba(0,0,0,0.5)'}}>
                              {props.link['description']?props.link['description']:""}
                          </span>
                      </div>
                  </div>
              </div>
              <div className="col col-lg-1 col-md-1 col-sm-1 col-xs-1">
                  <div className="text-right">
                    <span style={{cursor:'pointer'}}>
                        <Popover
                            placement="rightBottom"
                            content={
                                <div>
                                    <div onClick={()=>props.onDeleteLink(props.link['linkId'])} style={{cursor:'pointer'}}>
                                        <span><Delete style={{color:'red'}}/></span> 
                                        Delete this link
                                    </div>
                                </div>
                            }
                            title="Select an operation"
                            trigger="click"
                            visible={popOverVisibility}
                            onVisibleChange={()=>setPopOverVisibility(!popOverVisibility)}
                            >
                            <MoreVert type="primary"/>
                        </Popover>

                    </span>

                  </div>
              </div>
          </div>
      </div>
  )
}

export default Item;
