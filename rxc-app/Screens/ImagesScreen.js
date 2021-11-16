import * as React from 'react'
import ImageCard from '../Components/ImageCard'
import db from '../db/db.js'
import { ScrollView, View } from 'react-native'
import Heart from '../Components/Heart'

const images = db.filter(obj => obj.metadata.type === 'image')

const ImagesScreen = () => {
  return (
    <React.Fragment>
      <ScrollView style={{ backgroundColor: '#f8f3e7' }}>
        {images.map((ele) => (
          <ImageCard
            key={ele.filename}
            date={ele.date}
            title={ele.metadata.title}
            base64={ele.metadata.base64}
          />
        ))}
        <View style={{alignItems: 'center'}}>
          <Heart width={50} height={50} />
        </View>
      </ScrollView>
    </React.Fragment>
  )
}

export default ImagesScreen