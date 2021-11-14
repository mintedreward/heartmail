import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Text, Paragraph } from 'react-native-paper'
import YoutubePlayer from 'react-native-youtube-iframe'

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
  },
  innerContainer: {
    maxWidth: 800,
    width: '95%',
    marginVertical: 10
  }
})

const VideoCard = (props) => {
  return (
    <React.Fragment>
      <View style={styles.outerContainer}>
        <Card style={styles.innerContainer}>
          <Card.Content style={{ flexDirection: 'row' }}>
            <Paragraph>
              <Text style={{ fontWeight: 'bold' }}>{props.title}</Text>
            </Paragraph>
          </Card.Content>
          <Card.Content>
            <Paragraph>
              <Text>{new Date(props.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</Text>
            </Paragraph>
          </Card.Content>
          <Card.Content>
              <YoutubePlayer height={200} width={350} videoId={props.youtubeId} play={false} />
          </Card.Content>
        </Card>
      </View>
    </React.Fragment>
  )
}

export default VideoCard