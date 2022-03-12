const Circle = (props)=>{
    return (
    <span 
     style={{
         display:'inline-block',
         width:props.size?props.size:"8px",
         height:props.size?props.size:"8px",
         borderRadius:props.size?props.size/2:"4px",
         backgroundColor : props.bgColor?props.bgColor:'rgba(0,0,0,0.4)'
     }}
    ></span>
    )
}

export default Circle;