import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class ProfileScreen extends PureComponent {

  render() {
    return (
      <View style={{backgroundColor: '#aaa', flex: 1}}>
        <Text style={styles.text}>Profile</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    marginTop: 50,
    marginLeft: 50,
  }
});
