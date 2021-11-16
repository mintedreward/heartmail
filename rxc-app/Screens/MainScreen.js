import React, { useState } from 'react'
import ArticlesScreen from './ArticlesScreen'
import HeadlinesScreen from './HeadlinesScreen'
import VideosScreen from './VideosScreen'
import ImagesScreen from './ImagesScreen'
import PrivacyPolicyScreen from './PrivacyPolicyScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// Install this package with `expo install expo-linking`
import * as Linking from 'expo-linking';

// Linking.createURL is available as of expo@40.0.1 and expo-linking@2.0.1. If
// you are using older versions, you can upgrade or use Linking.makeUrl instead,
// but note that your deep links in standalone apps will be in the format
// scheme:/// rather than scheme:// if you use makeUrl.
const prefix = Linking.createURL('/');
const Tab = createMaterialBottomTabNavigator();

const Screen = () => {
  const linking = {
    prefixes: [prefix, 'https://www.ryanxcharles.com'],
  }

  return (
    <NavigationContainer linking={linking}>
      <Tab.Navigator activeColor='#f8f3e7' inactiveColor='#c5c0b6' barStyle={{ backgroundColor: '#4d4843' }}>
        <Tab.Screen name='Articles' component={ArticlesScreen} options={{ tabBarIcon: 'facebook' }} />
        <Tab.Screen name='Videos' component={VideosScreen} options={{ tabBarIcon: 'youtube' }} />
        <Tab.Screen name='Headlines' component={HeadlinesScreen} options={{ tabBarIcon: 'twitter' }} />
        <Tab.Screen name='Images' component={ImagesScreen} options={{ tabBarIcon: 'instagram' }} />
        <Tab.Screen name='Privacy' component={PrivacyPolicyScreen} options={{ tabBarIcon: 'file-outline' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Screen