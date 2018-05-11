import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import * as Res from '../../res'

export default class ContactScreen extends PureComponent {

  render() {
    return (
      <View style={Res.Styles.safeAreaTop}>
        <View style={styles.rootContainer}>
          <Text style={styles.text}>Contact</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Res.Colors.windowBackground
  },
  text: {
    fontSize: 18,
    padding: 16
  }
});
