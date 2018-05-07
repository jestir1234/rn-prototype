import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import * as Res from '../../res'
import styles from './style.js'
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
      <View style={Res.Styles.safeAreaTop}>
        <View style={styles.rootContainer}>
          <View style={styles.fieldsContainer}>
            <Text style={styles.text}>{Res.Strings.profile_title}</Text>
              <TouchableOpacity
                id="LogoutId"
                testID="LogoutTestId"
                accessibilityLabel="LogoutAccessibilityLabel"
                onPress={() => this._onLogoutRequested()}
                style={[styles.button, {backgroundColor: Res.Colors.primary}]} >
                <Text
                  style={styles.buttonText} >{Res.Strings.profile_logout_button}</Text>
              </TouchableOpacity>
          </View>

          {this._loadingView()}
        </View>
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

const mapStateToProp = (state) => {
  return {
    loading: state.user.isLoading,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
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
