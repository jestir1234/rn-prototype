import React, { PureComponent } from 'react'
import { StyleSheet, View, Image, Text, TextInput, Button, ActivityIndicator } from 'react-native'
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

  componentDidMount() {
    this._onLoadAuthCredentialsRequested();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.isLoggedIn) {
      this._onShowHomeScreen();
    }
  }

  _onLoadAuthCredentialsRequested() {
    this.props.onLoadAuthCredentialsRequested();
  }

  _onLoginRequested() {
    this.props.onLoginRequested(this.state.username, this.state.password);
  }

  _onShowHomeScreen() {
    this.props.navigation.navigate('HomeScreen');
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.fieldsContainer}>
          <Image
            source={require('../../../wide-logo.png')}
            style={styles.imageView} />

          <View >
            <Text>Email:</Text>
            <TextInput
              id="UsernameId"
              testID="UsernameTestId"
              accessibilityLabel="UsernameAccessibilityLabel"
              onChangeText={(text) => this.setState({username: text})}
              keyboardType='email-address'
              style={styles.editText} />
            {this._emailErrorMessage()}
          </View>

          <View
            style={{marginBottom: 32}}>
            <Text>Password:</Text>
            <TextInput
              id="PasswordId"
              testID="PasswordTestId"
              accessibilityLabel="PasswordAccessibilityLabel"
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry={true}
              style={styles.editText} />
            {this._passwordErrorMessage()}
          </View>

          <View >
            <Button
              id="LoginId"
              testID="LoginTestId"
              accessibilityLabel="LoginAccessibilityLabel"
              title="Login"
              onPress={() => this._onLoginRequested()}
              color="#53D493" />
          </View>

          {this._message()}
        </View>

        {this._loadingView()}
      </View>
    );
  }

  _loadingView() {
    if(this.props.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color='black' style={styles.loading} />
        </View>
      );
    }
  }

  _message() {
    if(this.props.isLoggedIn) {
      return (
        <Text style={{ marginTop: 32, color: '#53D493' }}>Logged in successfully!</Text>
      );
    } else if(this.props.error !== null
      && this.props.error === UserAction.AuthenticationErrorType.AUTHENTICATION_ERROR_WRONG_CREDENTIALS
      && this.props.errorMessage !== null) {
      return (
        <Text style={{ marginTop: 32, color: 'red' }}>{this.props.errorMessage}</Text>
      );
    }
  }

  _emailErrorMessage() {
    if(this.props.error !== null
      && (this.props.error === UserAction.AuthenticationErrorType.AUTHENTICATION_ERROR_USER_EMPTY
      || this.props.error === UserAction.AuthenticationErrorType.AUTHENTICATION_ERROR_USER_PASSWORD_EMPTY)) {
      return (
        <Text style={styles.errorMessage}>You need to provide an email!</Text>
      );
    } else {
      return (
        <Text style={styles.errorMessage}> </Text>
      );
    }
  }

  _passwordErrorMessage() {
    if(this.props.error !== null
      && (this.props.error === UserAction.AuthenticationErrorType.AUTHENTICATION_ERROR_PASSWORD_EMPTY
      || this.props.error === UserAction.AuthenticationErrorType.AUTHENTICATION_ERROR_USER_PASSWORD_EMPTY)) {
      return (
        <Text style={styles.errorMessage}>You need to provide a password!</Text>
      );
    } else {
      return (
        <Text style={styles.errorMessage}> </Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  fieldsContainer: {
    display: 'flex',
    flex: -1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 24,
    padding: 16
  },
  imageView: {
    width: '100%',
    marginTop: 24,
    marginBottom: 48,
    resizeMode: 'contain'
  },
  editText: {
    height: 40,
    borderColor: 'gray',
    padding: 4,
    borderWidth: 1
  },
  loadingContainer: {
    backgroundColor: '#00000022',
    display: 'flex',
    flex: 1,
    alignItems: 'stretch',
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  loading: {
    flex: 1
  },
  errorMessage: {
    color: 'red',
    marginTop: 4,
    marginBottom: 16
  }
});

const mapStateToProp = (state) => {
  return {
    loading: state.user.isLoading,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    error: state.user.authErrorType,
    errorMessage: state.user.authErrorMessage
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginRequested: (username, password) => {
      dispatch(UserAction.requestLogIn(username, password))
    },
    onLoadAuthCredentialsRequested: () => {
      dispatch(UserAction.loadAuthCredentialsFromStorage())
    }
  }
};

const LoginScreen = connect(
  mapStateToProp,
  mapDispatchToProps,
)(_loginScreen);

export default LoginScreen;
