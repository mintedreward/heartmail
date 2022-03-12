import {Link} from "@material-ui/icons";

import "../styles/linkitem.css";


const Item = (props)=>{
    return (
        <a href={props.link['url']} target="_blank" className="d-block container-linkItem-root p-3"
        style={{
           borderWidth : '3px'
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
                    <div className="text-left"
                    style={{display:'flex',flexDirection:'column', alignContent:'flex-start',justifyContent:'center'}}
                    
                    >
                        <div className="pb-1 w-100">
                            <span style={{fontWeight:'bold'}}>
                                {props.link['title']}
                            </span>
                        </div>
                        <div className="w-100">
                            <span style={{fontSize:'13px',color:'rgba(0,0,0,0.5)'}}>
                                {props.link['description']?props.link['description']:""}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
            </div>
        </a>
    )
}

export default Item;