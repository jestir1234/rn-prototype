import React, { PureComponent } from 'react'
import { StyleSheet, View, Image, Text, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import * as Res from '../../res'
import styles from './style.js'
import { connect } from 'react-redux'
import { UserAction } from '../../actions'

class _loginScreen extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isLoggedIn) {
      this._onShowHomeScreen();
    }
  }

  _onLoginRequested() {
    this.props.onLoginRequested(this.state.username, this.state.password);
  }

  _onShowHomeScreen() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.rootContainer}>

        <View style={styles.backgroundView}>

          <Image
            source={require('../../res/image/login_background.png')}
            style={styles.backgroundImageView} />

        </View>

        <View style={styles.fieldsContainer}>
          <Text
            style={styles.titleText}>{Res.Strings.login_login_title}</Text>

          <View >
            <TouchableOpacity
              id="LoginWithFacebookId"
              testID="LoginWithFacebookTestId"
              accessibilityLabel="LoginWithFacebookAccessibilityLabel"
              onPress={() => {}}
              style={[styles.button, {backgroundColor: Res.Colors.facebookBlue}]} >
              <Image
                source={require('../../res/image/facebook_icon.png')}
                style={{width: 18, height: 18, marginRight: 12, marginTop: 9, marginBottom: 13}} />
              <Text
                style={styles.buttonText} >{Res.Strings.login_login_facebook_button}</Text>
            </TouchableOpacity>
          </View>

          <Text
            style={[styles.generalText, styles.centerText, styles.orTextView]}>{Res.Strings.login_or}</Text>

          <View >
            <Text
              style={[styles.generalText, styles.hintText]}>{Res.Strings.login_email}</Text>
            <TextInput
              id="UsernameId"
              testID="UsernameTestId"
              accessibilityLabel="UsernameAccessibilityLabel"
              onChangeText={(text) => this.setState({ username: text })}
              keyboardType='email-address'
              underlineColorAndroid="transparent"
              style={[styles.generalText, styles.textInput]}>{this.state.username}</TextInput>
            <Text style={styles.errorMessage}>{this.props.emailErrorMessage}</Text>
          </View>

          <View
            style={{ marginTop: 7 }}>
            <Text
            style={[styles.generalText, styles.hintText]}>{Res.Strings.login_password}</Text>
            <TextInput
              id="PasswordId"
              testID="PasswordTestId"
              accessibilityLabel="PasswordAccessibilityLabel"
              onChangeText={(text) => this.setState({ password: text })}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              style={[styles.generalText, styles.textInput]}>{this.state.password}</TextInput>
            <Text style={styles.errorMessage}>{this.props.passwordErrorMessage}</Text>
          </View>

          <Text
            style={[styles.generalText, styles.orangeText, styles.rightAlignText, {marginBottom: 16}]}>{Res.Strings.login_forgot_password}</Text>

          <View >
            <TouchableOpacity
              id="LoginId"
              testID="LoginTestId"
              accessibilityLabel="LoginAccessibilityLabel"
              onPress={() => this._onLoginRequested()}
              style={[styles.button, {backgroundColor: Res.Colors.primary}]} >
              <Text
                style={styles.buttonText} >{Res.Strings.login_login_button}</Text>
            </TouchableOpacity>
          </View>

          <Text
            style={[styles.centerText, {marginTop: 16}]}>
            <Text
              style={styles.generalText}>{Res.Strings.login_register_question}</Text>
            <Text
              style={[styles.generalText, styles.orangeText]}>{Res.Strings.login_register_action}</Text>
          </Text>

          {this._message()}
        </View>

        {this._loadingView()}
      </View>
    );
  }

  _loadingView() {
    if (this.props.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Res.Colors.primary} />
        </View>
      );
    }
  }

  _message() {
    if (this.props.isLoggedIn) {
      return (
        <Text style={{ marginTop: 8, color: Res.Colors.primary }}>{Res.Strings.login_success}</Text>
      );
    } else {
      return (
        <Text testID="ErrorTestId" style={{ marginTop: 8, color: 'red' }}>{this.props.authErrorMessage}</Text>
      );
    }
  }
}

const mapStateToProp = (state) => {
  return {
    loading: state.user.isLoading,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    emailErrorMessage: state.user.emailErrorMessage,
    passwordErrorMessage: state.user.passwordErrorMessage,
    authErrorMessage: state.user.authErrorMessage
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginRequested: (username, password) => {
      dispatch(UserAction.requestLogIn(username, password))
    }
  }
};

const LoginScreen = connect(
  mapStateToProp,
  mapDispatchToProps,
)(_loginScreen);

export default LoginScreen;
