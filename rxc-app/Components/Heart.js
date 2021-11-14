import * as React from 'react'
import { Image } from 'react-native'

const Heart = (props) => {
  const width = props.width ? props.width : 50
  const height = props.height ? props.height : 50
  return (
    <Image source={require('../static/rxc-avatar-light.png')} style={{ width, height }} />
  )
}

export default Heart