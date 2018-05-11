import React, { PureComponent } from 'react'
import { StyleSheet, View, Image, Text, TextInput, Button, ActivityIndicator } from 'react-native'
import styles from './style.js'
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
      <View style={styles.rootContainer}>
        <Image
          source={require('../../res/image/splash-logo-hdpi.png')}
          style={styles.imageView} />
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

const SplashScreen = connect(
  mapStateToProp,
  mapDispatchToProps,
)(_splashScreen);

export default SplashScreen;
