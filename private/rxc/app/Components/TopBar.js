import * as React from 'react'
import { Appbar } from 'react-native-paper'
import { View } from 'react-native'

const TopBar = () => (
  <Appbar.Header>
    <View style={{textAlign: 'left'}}>
      <Appbar.Content title='Ryan X. Charles' subtitle='The limits are all in your head.' color='#f8f3e7' />
    </View>
  </Appbar.Header>
)

export default TopBar