import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "./Views/HomeScreen";
import MyDeliveries from "./Views/MyDeliveries";

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    MyDeliveries: {
      screen: MyDeliveries
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
