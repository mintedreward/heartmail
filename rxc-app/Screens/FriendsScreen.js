import * as React from 'react'
import ArticleCard from '../Components/ArticleCard'
import db from '../db/db.js'
import { ScrollView, View } from 'react-native'
import Heart from '../Components/Heart'
import { Image } from 'react-native'

const articles = db.filter(obj =>  obj.filename === 'friends.md')

const FriendsScreen = () => {
  return (
    <React.Fragment>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{alignItems: 'center'}}>
          <Image style={{ width: 300, height: 200 }} source={require('../static/rxc-friends.png')} />
        </View>
        {articles.map((ele) => (
          <ArticleCard
            key={ele.filename}
            date={ele.date}
            author={ele.metadata.author}
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

export default FriendsScreen