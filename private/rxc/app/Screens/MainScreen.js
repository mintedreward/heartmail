import React, { useState } from 'react'
import FeedRoute from './FeedScreen'
import { BottomNavigation } from 'react-native-paper'

const Screen = () => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'ryanbook', title: 'Ryanbook', icon: 'facebook' },
    { key: 'ryantube', title: 'RyanTube', icon: 'youtube' },
    { key: 'ryr', title: 'Ryr', icon: 'twitter' },
    { key: 'ryangram', title: 'Ryangram', icon: 'instagram' },
    { key: 'ryack', title: 'SlaX', icon: 'slack' },
    { key: 'rmail', title: 'RMail', icon: 'gmail' },
  ])

  const renderScene = BottomNavigation.SceneMap({
    ryanbook: FeedRoute,
    ryantube: FeedRoute,
    ryr: FeedRoute,
    ryangram: FeedRoute,
    ryack: FeedRoute,
    rmail: FeedRoute
  })

  return (
    <BottomNavigation
      barStyle={{backgroundColor: '#4d4843'}}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

export default Screen