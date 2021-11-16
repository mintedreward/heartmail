import React, { useState } from 'react'
import ArticlesScreen from './ArticlesScreen'
import HeadlinesScreen from './HeadlinesScreen'
import VideosScreen from './VideosScreen'
import ImagesScreen from './ImagesScreen'
import PrivacyPolicyScreen from './PrivacyPolicyScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const Screen = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator activeColor='#f8f3e7' inactiveColor='#f8f3e7' barStyle={{ backgroundColor: '#4d4843' }}>
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