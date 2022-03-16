import React, { useState } from "react";

import {Add} from "@material-ui/icons"

const Button = (props)=>{

  return (
    <div style={{
      position:'fixed',
      bottom:'8vh',
      right:'50vw',
      cursor:'pointer',
    }}
    >
      <div className="text-center" 
        style={{
          backgroundColor:'rgba(245,119,62,1)',
          display:'flex',alignItems:'center', 
          alignContent:'center',
          justifyContent:'center',
          width:'64px',
          height:'64px',
          borderRadius:'32px',
          boxShadow:'0px 0px 20px rgba(0,0,0,0.2)'

          
          }}>
        <a onClick={props.onClick}>
          <Add style={{
            color:'rgba(255,255,255,1)',
            fontWeight:'bold',
            fontSize:'32px'
          }}/>
        </a>
      </div>
    </div>
  );
}

export default Button;
