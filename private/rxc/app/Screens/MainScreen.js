import React, { useState } from 'react'
import ArticlesScreen from './ArticlesScreen'
import HeadlinesScreen from './HeadlinesScreen'
import VideosScreen from './VideosScreen'
import ImagesScreen from './ImagesScreen'
import { BottomNavigation } from 'react-native-paper'

const Screen = () => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'articles', title: 'Ryanbook', icon: 'facebook' },
    { key: 'videos', title: 'RyanTube', icon: 'youtube' },
    { key: 'headlines', title: 'Ryr', icon: 'twitter' },
    { key: 'images', title: 'Ryangram', icon: 'instagram' },
    { key: 'chat', title: 'SlaX', icon: 'slack' },
    { key: 'mail', title: 'RMail', icon: 'gmail' },
  ])

  const renderScene = BottomNavigation.SceneMap({
    articles: ArticlesScreen,
    videos: VideosScreen,
    headlines: HeadlinesScreen,
    images: ImagesScreen,
    chat: ArticlesScreen,
    mail: ArticlesScreen
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