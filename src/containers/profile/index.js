import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, Button, ActivityIndicator } from 'react-native'
import * as Res from '../../res'
import { connect } from 'react-redux'
import { UserAction } from '../../actions'

class _profileScreen extends PureComponent {

  constructor(props) {
    super(props);
  }

  _onLogoutRequested() {
    this.props.onLogoutRequested();
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.fieldsContainer}>
          <Text style={styles.text}>Profile</Text>
            <Button
              title="Logout"
              onPress={() => this._onLogoutRequested()}
              color={Res.Colors.primary} />
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
  loadingContainer: {
    backgroundColor: '#00000022',
    display: 'flex',
    flex: 1,
    alignItems: 'stretch',
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  text: {
    fontSize: 20,
    marginTop: 50,
    marginLeft: 50,
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
    onLogoutRequested: () => {
      dispatch(UserAction.requestLogOut())
    }
  }
};

const ProfileScreen = connect(
  mapStateToProp,
  mapDispatchToProps,
)(_profileScreen);

export default ProfileScreen;
