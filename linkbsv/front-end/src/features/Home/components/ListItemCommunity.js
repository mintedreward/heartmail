import TextButton from "../../../repository/components/TextButton/textButton";
import socialTree from "../assets/images/social-tree.svg";
import {ArrowRightAlt} from "@material-ui/icons"
const Item = (props)=>{

    const renderThumbnail = (url)=>{
        return url?url:socialTree;
    }

    return (
        <div
        className="p-4 "
        style={{
            backgroundImage : `url(${renderThumbnail(props.data['avatarUrl'])})`,
            height:'280px',
            width:'280px',
            backgroundPosition:'center',
            backgroundSize:'cover',
            borderRadius:'13px',
            backgroundColor:'rgba(0,0,0,1)',
            cursor:'pointer'

            }}
        onClick = {()=>{
            //window.location.href = `/award/event/list/${props['data']['eventId']}`
        }}
        >
            <div className="header">
                <h3 style={{fontSize:'22px',fontWeight:'bold',color:'rgba(255,255,255,1)',textShadow:'0px 0px 5px rgba(0,0,0,0.6)'}}>
                    @{props.data['userName']}
                </h3>
            </div>
            <div className="body">
                <span
                    style={{
                        position:'fixed',
                        bottom:'10px'
                    }}
                >
                    <TextButton
                        borderColor="rgba(0,0,0,0)"
                        label="Visit Page"
                        link={`https://linkbsv.com/${props['data']['userName']}`}
                        width="auto"
                        target="_blank"
                        icon={<ArrowRightAlt/>}
                        padding="8px 40px"
                    />
                </span>
            </div>
        </div>
    )
}

export default Item;