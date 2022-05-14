import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Text, Paragraph } from 'react-native-paper'
import YoutubePlayer from 'react-native-youtube-iframe'
import Markdown from 'react-native-markdown-display'

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
              <Text>{props.author}</Text>
            </Paragraph>
            <Paragraph>
              <Text>{new Date(props.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</Text>
            </Paragraph>
          </Card.Content>
          <Card.Content>
              <YoutubePlayer height={200} width={350} videoId={props.youtubeId} play={false} />
          </Card.Content>
          <Card.Content>
              <Markdown style={{ heading1: { fontSize: 20, marginBottom: 10, marginTop: 10 }}}>{props.content}</Markdown>
          </Card.Content>
        </Card>
      </View>
    </React.Fragment>
  )
}

export default VideoCard