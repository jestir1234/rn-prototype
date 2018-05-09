import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Root } from "native-base"
import { Provider } from 'react-redux'
import { SwitchNavigator } from 'react-navigation';
import SplashScreen from './src/containers/splash'
import LoginScreen from './src/containers/login'
import HomeScreen from './src/containers/home'
import provideStoreManager from './src/stores'
import { YellowBox } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import * as Res from './src/res'

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
    let storeManager = provideStoreManager()
    return (
      <Provider store={storeManager.store}>
        <PersistGate loading={null} persistor={storeManager.persistor}>
          <Root>
            <StatusBar
              backgroundColor={Res.Colors.bottomNavigationBackground}
              barStyle="light-content" />
            <RootStack />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}
