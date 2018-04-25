import React, { PureComponent } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import { Icon } from 'native-base';

import ContactScreen from '../contact'
import ProfileScreen from '../profile'
import ScheduleScreen from '../schedule'

const HomeScreen = TabNavigator (
  {
    Schedule: { screen: ScheduleScreen },
    Profile: { screen: ProfileScreen },
    Contact: { screen: ContactScreen }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Schedule') {
          iconName = 'md-time';
        } else if (routeName === 'Profile') {
          iconName = 'md-contact';
        } else if (routeName === 'Contact') {
          iconName = 'md-mail';
        }

        return <Icon
            name={iconName}
            style={{fontSize: 24, color: tintColor}}/>;
      },
    }),
    tabBarComponent: TabBarBottom,
    swipeEnabled: false,
    animationEnabled: false,
    backBehavior: 'none',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#50d691',
      inactiveTintColor: '#acacac',
    }
  }
)

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 20,
    marginTop: 50,
    marginLeft: 50,
  }
});

export default HomeScreen
