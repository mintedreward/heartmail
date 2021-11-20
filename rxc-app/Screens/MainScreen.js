import React, { useState } from 'react'
import ArticlesScreen from './ArticlesScreen'
import AphorismsScreen from './AphorismsScreen'
import VideosScreen from './VideosScreen'
import ImagesScreen from './ImagesScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');
const Tab = createMaterialBottomTabNavigator();

const Screen = () => {
  const linking = {
    prefixes: [prefix, 'https://www.ryanxcharles.com', 'ryanxcharles.com://'],
  }

  return (
    <NavigationContainer linking={linking}>
      <Tab.Navigator activeColor='white' inactiveColor='#ddd' barStyle={{ backgroundColor: '#363431' }}>
        <Tab.Screen name='articles' component={ArticlesScreen} options={{ title: 'Articles', tabBarLabel: 'Articles', tabBarIcon: 'newspaper' }} />
        <Tab.Screen name='videos' component={VideosScreen} options={{ title: 'Videos', tabBarLabel: 'Videos', tabBarIcon: 'youtube' }} />
        <Tab.Screen name='images' component={ImagesScreen} options={{ title: 'Images', tabBarLabel: 'Images', tabBarIcon: 'instagram' }} />
        <Tab.Screen name='aphorisms' component={AphorismsScreen} options={{ title: 'Aphorisms', tabBarLabel: 'Aphorisms', tabBarIcon: 'twitter' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Screen