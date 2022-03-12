import Rect from "../rect";
import themeStyles from "../../../../consts/themeStyles"

const Card = (props)=>{
    return (
        <div
          onClick={()=>props.onSelect("quePal")}
          className="p-3" 
          style={{
            cursor:'pointer',
            borderRadius:'14px',
            boxShadow:props.selected?'0px 0px 15px rgba(61,210,252,1)':'none',
            border : `1px solid ${props.selected?'rgba(4,54,115,0.2)':'transparent'}`
          }}>
            <div className="header text-center pb-3">
                <h3 style={{fontSize:'16px',fontWeight:'600',color:'rgba(0,0,0,0.8)'}}>QuePal</h3>
            </div>
            <div 
            className="pl-4 pr-4 pt-5 pb-5"
            style={{borderRadius:'14px',... themeStyles.quePal}}
            >
            <div className="pb-2">
                <Rect/>
            </div>
            <div className="pb-2">
                <Rect/>
            </div>
            <div className="pb-2">
                <Rect/>
            </div>
            </div>
        </div>
    )
}

export default Card;
