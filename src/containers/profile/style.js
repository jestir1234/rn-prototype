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
  
  export default styles;