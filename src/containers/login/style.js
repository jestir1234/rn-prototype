import { StyleSheet } from 'react-native'

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
    imageView: {
      width: '100%',
      marginTop: 24,
      marginBottom: 48,
      resizeMode: 'contain'
    },
    editText: {
      height: 40,
      borderColor: 'gray',
      padding: 4,
      borderWidth: 1
    },
    loadingContainer: {
      backgroundColor: '#00000022',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute'
    },
    errorMessage: {
      color: 'red',
      marginTop: 4,
      marginBottom: 16
    }
  });
  
  export default styles;
  