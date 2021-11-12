import * as React from 'react'
import CustomCard from '../Components/Card'
import db from '../db/db.js'
import { ScrollView, Image, StyleSheet, View, Text } from 'react-native'
import Heart from '../Components/Heart'

const MusicRoute = () => {
  return (
    <React.Fragment>
      <ScrollView>
        {db.map((ele) => (
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

export default MusicRoute