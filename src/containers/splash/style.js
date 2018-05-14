import { StyleSheet } from 'react-native'
import * as Res from '../../res'

const styles = StyleSheet.create({
    rootContainer: {
      backgroundColor: Res.Colors.windowBackground,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageView: {
      width: '100%',
      resizeMode: 'cover',
      padding: 16
    }
  });
  
  export default styles;
