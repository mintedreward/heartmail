import * as React from "react";
import CustomCard from "../Components/Card";
import elements from "../CustomProperties/elements";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    maxWidth: 200,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const MusicRoute = () => {
  return (
    <React.Fragment>
      <ScrollView>
        {elements.map((ele) => (
          <CustomCard
            key={ele.id}
            title={ele.title}
            content={ele.content}
            uri={ele.uri}
            comment={ele.comment}
            shares={ele.shares}
            views={ele.views}
            likes={ele.likes}
          />
        ))}
      </ScrollView>
    </React.Fragment>
  );
};

export default MusicRoute;