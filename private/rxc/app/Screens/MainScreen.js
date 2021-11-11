import React, { useState } from 'react'
import FeedRoute from './FeedScreen'
import { BottomNavigation } from 'react-native-paper'

const Screen = () => {
  const [index, setIndex] = useState(0)
  // const [routes] = useState([
  //   { key: 'ryan', title: 'Ryan', icon: 'account', color: '#4d4843' },
  //   { key: 'ryanbook', title: 'Ryanbook', icon: 'facebook', color: '#566797' },
  //   { key: 'ryantube', title: 'RyanTube', icon: 'youtube', color: '#e14546' },
  //   { key: 'ryr', title: 'Ryr', icon: 'twitter', color: '#4c80a8' },
  //   { key: 'ryangram', title: 'Ryangram', icon: 'instagram', color: '#93bd6a' }
  // ])
  const [routes] = useState([
    { key: 'ryan', title: 'Ryan', icon: 'account', color: '#dd664a' },
    { key: 'ryanbook', title: 'Ryanbook', icon: 'facebook', color: '#dd664a' },
    { key: 'ryantube', title: 'RyanTube', icon: 'youtube', color: '#dd664a' },
    { key: 'ryr', title: 'Ryr', icon: 'twitter', color: '#dd664a' },
    { key: 'ryangram', title: 'Ryangram', icon: 'instagram', color: '#dd664a' }
  ])

  const renderScene = BottomNavigation.SceneMap({
    ryan: FeedRoute,
    ryanbook: FeedRoute,
    ryantube: FeedRoute,
    ryr: FeedRoute,
    ryangram: FeedRoute
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