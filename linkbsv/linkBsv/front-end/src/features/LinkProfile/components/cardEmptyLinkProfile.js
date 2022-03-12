import noData from "../assets/no-data.svg";
const Card = (props)=>{
    return (
        <div className="container-cardEmpty-root text-center">
            <div className="header">
                <img src={noData} alt="" 
                style={{
                       width:'120px',
                       height:'120px',
                       objectFit:'contain'
                    }}
                />
            </div>
            <div className="body">
                <p className="pt-5">
                    <span style={{fontWeight:'bold'}}>@{props.userName}</span> has no links to show
                </p>
            </div>  
        </div>
    );
}

export default Card;