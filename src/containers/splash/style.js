import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    rootContainer: {
      backgroundColor: Res.Colors.primary,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageView: {
      width: '100%',
      resizeMode: 'contain'
    }
  });
  
  export default styles;
