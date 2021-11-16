import * as React from 'react'
import CustomCard from '../Components/CustomCard'
import db from '../db/db.js'
import { ScrollView, View } from 'react-native'
import Heart from '../Components/Heart'

const articles = db.filter(obj => obj.metadata.type === 'article')

const ArticlesScreen = () => {
  return (
    <React.Fragment>
      <ScrollView style={{ backgroundColor: '#f8f3e7' }}>
        {articles.map((ele) => (
          <CustomCard
            key={ele.filename}
            date={ele.date}
            title={ele.metadata.title}
            content={ele.content}
          />
        ))}
        <View style={{alignItems: 'center'}}>
          <Heart width={50} height={50} />
        </View>
      </ScrollView>
    </React.Fragment>
  )
}

export default ArticlesScreen