import React, { useState } from 'react'
import ArticlesScreen from './ArticlesScreen'
import HeadlinesScreen from './HeadlinesScreen'
import VideosScreen from './VideosScreen'
import ImagesScreen from './ImagesScreen'
import PrivacyPolicyScreen from './PrivacyPolicyScreen'
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
      <Tab.Navigator activeColor='#f8f3e7' inactiveColor='#c5c0b6' barStyle={{ backgroundColor: '#4d4843' }}>
        <Tab.Screen name='articles' component={ArticlesScreen} options={{ title: 'Articles', tabBarLabel: 'Articles', tabBarIcon: 'facebook' }} />
        <Tab.Screen name='videos' component={VideosScreen} options={{ title: 'Videos', tabBarLabel: 'Videos', tabBarIcon: 'youtube' }} />
        <Tab.Screen name='headlines' component={HeadlinesScreen} options={{ title: 'Headlines', tabBarLabel: 'Headlines', tabBarIcon: 'twitter' }} />
        <Tab.Screen name='images' component={ImagesScreen} options={{ title: 'Images', tabBarLabel: 'Images', tabBarIcon: 'instagram' }} />
        <Tab.Screen name='privacy-policy' component={PrivacyPolicyScreen} options={{ title: 'Privacy Policy', tabBarLabel: 'Privacy', tabBarIcon: 'file-outline' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Screen