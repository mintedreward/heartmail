import * as React from "react";
import CustomCard from "../Components/Card";
import elements from "../CustomProperties/elements";
import { ScrollView, Image, StyleSheet, View, Text } from "react-native";
import Heart from '../Components/Heart'

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
        <View style={{alignItems: 'center'}}>
          <Heart width={50} height={50} />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default MusicRoute;