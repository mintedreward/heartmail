import React from 'react'

const Button = (props)=>{
    return (
        <a onClick={(e)=>(props.link)?true:e.preventDefault()} href={(props.link)?props.link:"#"} className="text-center" 
            style={{
                display:'inline-block',
                backgroundColor:(props.bgColor)?props.bgColor:'rgba(255,255,255,1)',
                color:"rgba(0,0,0,1)",
                width:(props.width)?props.width:'40vw',
                heignt:props.height?props.height:'auto',
                border:`1px solid ${(props.borderColor)?props.borderColor:'black'}`,
                padding:(props.padding)?props.padding:'auto',
                fontSize:(props.fontSize)?props.fontSize:'16px',
                borderRadius:(props.borderRadius)?props.borderRadius:'6vw',
                boxShadow:(props.boxShadowOff)?'none':'0px 2px 6px rgba(0,0,0,0.5)',
                textDecoration:'none',
                
            
            }}
            target = {(props.target)?props.target:"_self"}
            >
             {
                 (props.icon)?
                   <span style={{
                       color : props.iconColor?props.iconColor:'rgba(0,0,0,1)'
                   }}>
                       {props.icon}
                   </span>
                 :
                   <span></span>
             }
             <span style={{color:(props.color)?props.color:'rgba(0,0,0,1)'}}>{props.label}</span>
        </a>
    )
}

export default Button;