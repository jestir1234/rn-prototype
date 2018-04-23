import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator } from 'react-native'
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
          <Text>Username:</Text>
          <TextInput
            onChangeText={(text) => this.setState({username: text})}
            style={styles.editText} />

          <Text>Password:</Text>
          <TextInput
            onChangeText={(text) => this.setState({password: text})}
            style={styles.editText} />

          <Button
            title="Login"
            onPress={() => this._onLoginRequested()}
            style={styles.loginButton}/>

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
        <Text style={styles.message}>Logged in successfully!</Text>
      );
    } else if(this.props.error != null) {
      return (
        <Text style={styles.message}>{this.props.error}</Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  fieldsContainer: {
    display: 'flex',
    flex: -1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    alignItems: 'stretch',
    marginTop: 24,
    padding: 16
  },
  editText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  loginButton: {
    marginTop: 32
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
  message: {
    marginTop: 32
  }
});

const mapStateToProp = (state) => {
  return {
    loading: state.user.isLoading,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    error: state.user.authErrorType
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
