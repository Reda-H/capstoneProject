/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, StyleSheet, Text, View, Navigator} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './src/components/Profile/Profile';
import Payment from './src/components/Payment/Payment';
import Verification from './src/components/Payment/Verification';

const Login = createStackNavigator();

export default class capstone extends Component {
  render() {
    return (
      <NavigationContainer>
        <Login.Navigator initialRouteName="Login">
          <Login.Screen name="Login" component={App} />
          <Login.Screen name="Profile" component={Profile} />
          <Login.Screen name="Payment" component={Payment} />
          <Login.Screen name="Verification" component={Verification} />
        </Login.Navigator>
      </NavigationContainer>
    );
  }
}

AppRegistry.registerComponent(appName, () => capstone);
