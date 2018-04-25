import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class ContactScreen extends PureComponent {
  
  render() {
    return (
      <View style={{backgroundColor: '#999', flex: 1}}>
        <Text style={styles.text}>Contact</Text>
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
