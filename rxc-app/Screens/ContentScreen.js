import * as React from 'react'
import ArticleCard from '../Components/ArticleCard'
import ImageCard from '../Components/ImageCard'
import VideoCard from '../Components/VideoCard'
import AphorismCard from '../Components/AphorismCard'
import db from '../db/db.js'
import { ScrollView, View } from 'react-native'
import Heart from '../Components/Heart'
import { Image } from 'react-native'

const media = db.filter(obj => obj.metadata.type === 'article' || obj.metadata.type === 'video' || obj.metadata.type === 'aphorism' || obj.metadata.type === 'image')

const ContentScreen = () => {
  return (
    <React.Fragment>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{alignItems: 'center'}}>
          <Image style={{ width: 300, height: 200 }} source={require('../static/rxc-big-header-light.png')} />
        </View>
        {media.map((ele) => {
          if (ele.metadata.type === 'article') {
            return (
              <ArticleCard
                key={ele.filename}
                date={ele.date}
                author={ele.metadata.author}
                title={ele.metadata.title}
                content={ele.content}
              />
            )
          } else if (ele.metadata.type === 'video') {
            return (
              <VideoCard
                key={ele.filename}
                date={ele.date}
                author={ele.metadata.author}
                title={ele.metadata.title}
                youtubeId={ele.metadata.youtubeId}
              />
            )
          } else if (ele.metadata.type === 'aphorism') {
            return (
              <AphorismCard
                key={ele.filename}
                date={ele.date}
                author={ele.metadata.author}
                title={ele.metadata.title}
              />
            )
          } else if (ele.metadata.type === 'image') {
            return (
              <ImageCard
                key={ele.filename}
                date={ele.date}
                author={ele.metadata.author}
                title={ele.metadata.title}
                base64={ele.metadata.base64}
              />
            )
          }
        })}
        <View style={{alignItems: 'center'}}>
          <Heart width={50} height={50} />
        </View>
      </ScrollView>
    </React.Fragment>
  )
}

export default ContentScreen