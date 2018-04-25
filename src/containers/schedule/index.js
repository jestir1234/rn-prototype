import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class ScheduleScreen extends PureComponent {

  render() {
    return (
      <View style={{backgroundColor: '#ddd', flex: 1}}>
        <Text style={styles.text}>Schedule</Text>
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
