import * as React from 'react'
import CustomCard from '../Components/CustomCard'
import db from '../db/db.js'
import { ScrollView, View } from 'react-native'
import Heart from '../Components/Heart'

const ChatScreen = () => {
  return (
    <React.Fragment>
      <ScrollView>
          <CustomCard
            key={'key'}
            date={'2021-11-11'}
            title={'Chat'}
            content={'Chat is coming soon.'}
          />
        <View style={{alignItems: 'center'}}>
          <Heart width={50} height={50} />
        </View>
      </ScrollView>
    </React.Fragment>
  )
}

export default ChatScreen