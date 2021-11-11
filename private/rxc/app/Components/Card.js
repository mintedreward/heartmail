import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Paragraph } from "react-native-paper";

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
  },
  innerContainer: {
    maxWidth: 800,
    width: '95%',
    marginVertical: 10,
  }
});

const CustomCard = (props) => {
  return (
    <React.Fragment>
      <View style={styles.outerContainer}>
        <Card style={styles.innerContainer}>
          <Card.Content style={{ flexDirection: "row" }}>
            <Paragraph style={{ marginTop: 15 }}>
              <Text style={{ fontWeight: "bold" }}>{props.title}</Text>
            </Paragraph>
          </Card.Content>
          <Card.Content>
            <Paragraph>{props.content}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </React.Fragment>
  );
};

export default CustomCard;