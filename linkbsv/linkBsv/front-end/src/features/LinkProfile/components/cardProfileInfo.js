import UserAvatar from "../../../repository/components/userAvatar/userAvatar";

const renderTheme = (themeId)=>{
   
    switch(themeId.toLowerCase()){
        case "default":
            return {
                color:'rgba(0,0,0,1)',
                fontWeight:'bold'

            }
            break;
        case "quepal":
            return {
                color:'rgba(0,0,0,1)',
                fontWeight:'bold'
            }
            break;
        case "moonlitasteroid":
            return {
                color:'rgba(255,255,255,1)',
                fontWeight:'bold'

            }
            break;

    }
}



const Card = (props)=>{
    return (
         <div className="text-center">
             <UserAvatar size={96} avatarUrl={props.profile['avatarUrl']}/>
             <div className="pt-4">
                 <span style={renderTheme(props.themeId)}>@{props.profile['userName']}</span>
             </div>
         </div>
    )
}

export default Card;