import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar, Image } from "react-native";
import { Root } from "native-base";
import { Provider } from "react-redux";
import { SwitchNavigator } from "react-navigation";
import SplashScreen from "react-native-splash-screen";
import MySplashScreen from "./src/containers/splash";
import LoginScreen from "./src/containers/login";
import HomeScreen from "./src/containers/home";

import provideStoreManager from "./src/stores";
import { YellowBox } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import * as Res from "./src/res";
import logo from "./src/res/image/GRM-app-icon.png";

if (__DEV__) {
  require("react-devtools");
}

YellowBox.ignoreWarnings([
  "Warning: componentWillMount is deprecated",
  "Warning: componentWillReceiveProps is deprecated",
  "Warning: componentWillUpdate is deprecated",
  "Warning: isMounted(...) is deprecated"
]);

const RootStack = SwitchNavigator({
  Splash: { screen: MySplashScreen },
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen }
});

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    let storeManager = provideStoreManager();
    return (
      <Provider store={storeManager.store}>
        <PersistGate loading={null} persistor={storeManager.persistor}>
          <Root>
            <View
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                height: 45,
                width: "100%",
                backgroundColor: Res.Colors.bottomNavigationBackground
              }}
            >
              <Image style={{ height: 30, width: 30 }} source={logo} />
            </View>
            <RootStack />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}
