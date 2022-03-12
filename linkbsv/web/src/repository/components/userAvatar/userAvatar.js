import React from 'react';
import {AccountCircleRounded} from '@material-ui/icons'

const Avatar = (props)=>{
    return (
        <a className="avatar-wrapper" 
        href="/profile"
        style={{
            display:'inline-block',
        }}>
            {
                (props.avatarUrl)?
                    <img className="avatar-container" 
                    src = {props.avatarUrl}
                    style={{
                        width : (props.size)?`${props.size}px`:'84px',
                        height : (props.size)?`${props.size}px`:'84px',
                        borderRadius:(props.size)?`${props.size/2}px`:'42px',
                        backgroundColor : 'rgba(255,255,255,1)',
                        objectFit:'cover'
                    }}
                    />
                    :
                        <AccountCircleRounded
                            style={{
                                fontSize:props.size?`${props.size}px`:'84px',
                                color: props.color?props.color:'rgba(255,255,255,1)'
                            }}
                        />
            }
               
        </a>
    )
}

export default Avatar;