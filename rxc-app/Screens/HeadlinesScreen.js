import * as React from 'react'
import HeadlineCard from '../Components/HeadlineCard'
import db from '../db/db.js'
import { ScrollView, View } from 'react-native'
import Heart from '../Components/Heart'

const headlines = db.filter(obj => obj.metadata.type === 'headline')

const HeadlinesScreen = () => {
  return (
    <React.Fragment>
      <ScrollView style={{ backgroundColor: '#f8f3e7' }}>
        {headlines.map((ele) => (
          <HeadlineCard
            key={ele.filename}
            date={ele.date}
            title={ele.metadata.title}
          />
        ))}
        <View style={{alignItems: 'center'}}>
          <Heart width={50} height={50} />
        </View>
      </ScrollView>
    </React.Fragment>
  )
}

export default HeadlinesScreen