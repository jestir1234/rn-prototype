import React, { PureComponent } from 'react'
import { StyleSheet, View, Image, Text, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Toast } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Res from '../../res'
import styles from './style.js'
import { connect } from 'react-redux'
import { UserAction } from '../../actions'

class _loginScreen extends PureComponent {

  constructor(props) {
    super(props);

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};

    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authErrorMessage !== prevProps.authErrorMessage) {
      this._message();
    }
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

  focusNextField(key) {
    this.inputs[key].focus();
  }

  render() {
    return (
      <View style={Res.Styles.safeAreaTop}>
        <KeyboardAwareScrollView
          style={{ backgroundColor: Res.Colors.windowBackground }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.rootContainer} >

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
                onSubmitEditing={() => {this.focusNextField('password')}}
                keyboardType='email-address'
                returnKeyType={ "next" }
                blurOnSubmit={ false }
                underlineColorAndroid="transparent"
                ref={ input => { this.inputs['email'] = input }}
                style={[styles.generalText, styles.textInput]}>{this.state.username}</TextInput>
                {this._textInputErrorMessage(this.props.emailErrorMessage, "EmailErrorTestId")}
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
                returnKeyType={ "done" }
                blurOnSubmit={ true }
                underlineColorAndroid="transparent"
                ref={ input => { this.inputs['password'] = input }}
                style={[styles.generalText, styles.textInput]}>{this.state.password}</TextInput>
                {this._textInputErrorMessage(this.props.passwordErrorMessage, "PasswordErrorTestId")}
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
              style={[styles.centerText, {marginTop: 16, marginBottom: 16 }]}>
              <Text
                style={styles.generalText}>{Res.Strings.login_register_question}</Text>
              <Text
                style={[styles.generalText, styles.orangeText]}>{Res.Strings.login_register_action}</Text>
            </Text>

          </View>

          {this._loadingView()}
        </KeyboardAwareScrollView>
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
      Toast.show({ text: Res.Strings.login_success })
    } else if (this.props.authErrorMessage) {
      Toast.show({ text: this.props.authErrorMessage })
    }
  }

  _textInputErrorMessage(text, testId) {
    if (text) {
      return (
        <Text testID={testId} style={styles.errorMessage}>{text}</Text>
      );
    } else {
      return (
        <Text style={styles.errorMessage}> </Text>
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
