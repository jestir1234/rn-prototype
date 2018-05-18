import React, { PureComponent } from 'react'
import { StyleSheet, View, Image, Text, TextInput, Button, ActivityIndicator } from 'react-native'
import styles from './style.js'
import * as Res from '../../res'
import { connect } from 'react-redux'
import { UserAction } from '../../actions'

class _splashScreen extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._onLoadAuthCredentialsRequested();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.isLoggedIn) {
      this._onShowHomeScreen();
    } else if(!this.props.isLoading){
      this._onShowLoginScreen();
    }
  }

  _onLoadAuthCredentialsRequested() {
    this.props.onLoadAuthCredentialsRequested();
  }

  _onShowHomeScreen() {
    this.props.navigation.navigate('Home');
  }

  _onShowLoginScreen() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={Res.Styles.safeAreaTop}>
        <View style={styles.rootContainer} testID="SplashScreenTestId">
          <ActivityIndicator size="large" color={Res.Colors.primary} />
        </View>
      </View>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    isLoading: state.user.isLoading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadAuthCredentialsRequested: () => {
      dispatch(UserAction.checkAuthCredentials())
    }
  }
};

const MySplashScreen = connect(
  mapStateToProp,
  mapDispatchToProps,
)(_splashScreen);

export default MySplashScreen;
