import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Text, Paragraph } from 'react-native-paper'

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
  },
  innerContainer: {
    maxWidth: 800,
    width: '95%',
    marginVertical: 10,
  }
})

const AphorismCard = (props) => {
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
        </Card>
      </View>
    </React.Fragment>
  )
}

export default AphorismCard