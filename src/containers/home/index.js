import React, { PureComponent } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import { Icon } from 'native-base'
import { connect } from 'react-redux'
import * as Res from '../../res'


import ContactScreen from '../contact'
import ProfileScreen from '../profile'
import ScheduleScreen from '../schedule'

const SafeTabBarBottom = (props) => {
  return <TabBarBottom {...props} style={[props.style, {backgroundColor: Res.Colors.bottomNavigationBackground}]} />
}

const HomeTabNavigator = TabNavigator (
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
    tabBarComponent: SafeTabBarBottom,
    swipeEnabled: false,
    animationEnabled: false,
    backBehavior: 'none',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeBackgroundColor: Res.Colors.bottomNavigationBackground,
      inactiveBackgroundColor: Res.Colors.bottomNavigationBackground,
      activeTintColor: Res.Colors.bottomNavigationActiveTintColor,
      inactiveTintColor: Res.Colors.bottomNavigationInactiveTintColor
    }
  }
)

class _homeScreen extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if(!this.props.isLoggedIn) {
      this._onShowLoginScreen();
    }
  }

  _onShowLoginScreen() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <HomeTabNavigator />
    );
  }
}

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 20,
    marginTop: 50,
    marginLeft: 50,
  }
});

const mapStateToProp = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn
  }
};

const HomeScreen = connect(
  mapStateToProp,
)(_homeScreen);

export default HomeScreen
