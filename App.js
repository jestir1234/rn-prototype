import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import LoginScreen from './src/containers/login'
import { userStore } from './src/stores'

if (__DEV__) {
  require('react-devtools');
}

export default class App extends Component {

  render() {
    return (
      <Provider store={userStore}>
        <LoginScreen />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#aaa',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginTop: 100
  },
});
