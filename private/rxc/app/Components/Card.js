import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Paragraph } from "react-native-paper";

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
  },
  innerContainer: {
    maxWidth: 800,
    width: '100%',
    marginVertical: 10,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#4169E1",
    margin: 10,
  },
  contentStart: { flexDirection: "row", alignItems: "flex-start" },
  contentEnd: { flexDirection: "row", alignItems: "flex-end" },
  horizontalLine: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginHorizontal: 15,
    paddingVertical: 5,
  },
  action: { flexDirection: "row", paddingTop: 5 },
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