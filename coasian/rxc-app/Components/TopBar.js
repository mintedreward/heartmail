import * as React from 'react'
import { Appbar, Avatar } from 'react-native-paper'
import { View } from 'react-native'

const TopBar = () => (
  <Appbar.Header style={{backgroundColor: '#363431'}}>
    <View style={{flexDirection: 'row', textAlign: 'left'}}>
      <View>
        <Avatar.Image size={40} source={require('../static/rxc-avatar.jpg')} />
      </View>
      <View>
        <Appbar.Content title='Ryan X. Charles' subtitle='ryan@ryanxcharles.com' color='white' />
      </View>
    </View>
  </Appbar.Header>
)

export default TopBar