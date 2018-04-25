import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { SwitchNavigator } from 'react-navigation';
import LoginScreen from './src/containers/login'
import HomeScreen from './src/containers/home'
import store from './src/stores'

if (__DEV__) {
  require('react-devtools');
}

const RootStack = SwitchNavigator({
  Login: { screen: LoginScreen },
  HomeScreen: { screen: HomeScreen },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
