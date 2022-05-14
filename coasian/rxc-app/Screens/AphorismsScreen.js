import * as React from 'react'
import AphorismCard from '../Components/AphorismCard'
import db from '../db/db.js'
import { ScrollView, View } from 'react-native'
import Heart from '../Components/Heart'

const headlines = db.filter(obj => obj.metadata.type === 'aphorism')

const AphorismsScreen = () => {
  return (
    <React.Fragment>
      <ScrollView style={{ backgroundColor: 'white' }}>
        {headlines.map((ele) => (
          <AphorismCard
            key={ele.filename}
            date={ele.date}
            author={ele.metadata.author}
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

export default AphorismsScreen