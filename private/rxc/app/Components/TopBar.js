import * as React from "react";
import { Appbar } from "react-native-paper";

// import { Image } from 'react-native'

// const fs = require('fs')

// const base64 = fs.readFileSync('../static/rxc-header-2-dark.png')
// const data = `data:image/png;base64,${base64}`

// const TopBar = () => (
//   <Appbar.Header style={{backgroundColor: '#4d4843'}}>
//     <Image source={data} width={475} height={100} />
//   </Appbar.Header>
// );

const TopBar = () => (
  <Appbar.Header style={{backgroundColor: '#4d4843'}}>
    <Appbar.Content title="Ryan X. Charles" subtitle="The limits are all in your head." color='#f8f3e7' />
  </Appbar.Header>
);

export default TopBar;