import * as React from 'react'
import VideoCard from '../Components/VideoCard'
import db from '../db/db.js'
import { ScrollView, View } from 'react-native'
import Heart from '../Components/Heart'

const videos = db.filter(obj => obj.metadata.type === 'video')

const VideosScreen = () => {
  return (
    <React.Fragment>
      <ScrollView style={{ backgroundColor: 'white' }}>
        {videos.map((ele) => (
          <VideoCard
            key={ele.filename}
            date={ele.date}
            author={ele.metadata.author}
            title={ele.metadata.title}
            youtubeId={ele.metadata.youtubeId}
          />
        ))}
        <View style={{alignItems: 'center'}}>
          <Heart width={50} height={50} />
        </View>
      </ScrollView>
    </React.Fragment>
  )
}

export default VideosScreen