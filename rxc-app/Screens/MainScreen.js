import React, { useState } from 'react'
import ArticlesScreen from './ArticlesScreen'
import HeadlinesScreen from './HeadlinesScreen'
import VideosScreen from './VideosScreen'
import ImagesScreen from './ImagesScreen'
import { BottomNavigation } from 'react-native-paper'

const Screen = () => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'articles', title: 'Articles', icon: 'facebook' },
    { key: 'videos', title: 'Videos', icon: 'youtube' },
    { key: 'headlines', title: 'Headlines', icon: 'twitter' },
    { key: 'images', title: 'Photos', icon: 'instagram' }
  ])

  const renderScene = BottomNavigation.SceneMap({
    articles: ArticlesScreen,
    videos: VideosScreen,
    headlines: HeadlinesScreen,
    images: ImagesScreen
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