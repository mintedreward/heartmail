import React, { useState } from 'react'
import FriendsScreen from './FriendsScreen'
import ContentScreen from './ContentScreen'
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
        <Tab.Screen name='content' component={ContentScreen} options={{ title: 'Content', tabBarLabel: 'Content', tabBarIcon: 'folder' }} />
        <Tab.Screen name='friends' component={FriendsScreen} options={{ title: 'Friends', tabBarLabel: 'Friends', tabBarIcon: 'account-group' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Screen