import { StyleSheet } from 'react-native'
import * as Colors from './colors.js'
import DevicePlatform from '../utils/DevicePlatform.js'

const styles = StyleSheet.create({
  safeAreaTop: {
    backgroundColor: Colors.bottomNavigationBackground,
    flex: 1,
    ...DevicePlatform.select({
      android: {
        paddingTop: 0
      },
      iosPortIphoneX: {
        paddingTop: 44
      },
      ios: {
        paddingTop: 20
      }
    })
  }
});

export default styles;
