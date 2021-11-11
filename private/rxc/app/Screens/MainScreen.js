import React, { useState } from "react";
import FeedRoute from "./FeedScreen";
import { BottomNavigation } from "react-native-paper";

const Screen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "ryanblog", title: "Ryan Blog", icon: "email-newsletter", color: "#4d4843" },
    { key: "ryantube", title: "Ryan Tube", icon: "youtube", color: "#e14546" },
    { key: "ryr", title: "Ryr", icon: "twitter", color: "#4c80a8" },
    { key: "ryangram", title: "Ryan Gram", icon: "instagram", color: "#93bd6a" },
    { key: "ryanbook", title: "Ryan Book", icon: "facebook", color: "#738bcb" }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    ryanblog: FeedRoute,
    ryantube: FeedRoute,
    ryr: FeedRoute,
    ryangram: FeedRoute,
    ryanbook: FeedRoute
  });

  return (
    <BottomNavigation
      barStyle={{backgroundColor: '#4d4843'}}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Screen;