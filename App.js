import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { SwitchNavigator } from 'react-navigation';
import SplashScreen from './src/containers/splash'
import LoginScreen from './src/containers/login'
import HomeScreen from './src/containers/home'
import store from './src/stores'
import { YellowBox } from 'react-native';

if (__DEV__) {
  require('react-devtools');
}

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
]);

const RootStack = SwitchNavigator({
  Splash: { screen: SplashScreen },
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
