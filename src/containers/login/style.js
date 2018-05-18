import { StyleSheet } from 'react-native'
import * as Res from '../../res'

const styles = StyleSheet.create({
    rootContainer: {
      backgroundColor: Res.Colors.windowBackground,
      flex: 1,
      justifyContent: 'center'
    },
    backgroundView: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      width: '100%',
      height: '100%',
      position: 'absolute'
    },
    backgroundImageView: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover'
    },
    fieldsContainer: {
      backgroundColor: Res.Colors.loginOverlayBackground,
      display: 'flex',
      flex: -1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      marginHorizontal: 26,
      paddingHorizontal: 26,
      paddingTop: 18,
      paddingBottom: 8
    },
    button: {
      height: 40,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold'
    },
    orTextView: {
      marginTop: 10
    },
    titleText: {
      marginBottom: 15,
      fontWeight: 'bold',
      fontSize: 26,
      textAlign: 'center',
      color: Res.Colors.loginTitleText
    },
    textInput: {
      height: 40,
      borderColor: Res.Colors.textInputBorder,
      color: Res.Colors.loginTextInput,
      padding: 8,
      borderWidth: 1
    },
    generalText: {
      fontSize: 14,
      color: Res.Colors.loginTitleText
    },
    centerText: {
      textAlign: 'center'
    },
    rightAlignText: {
      textAlign: 'right'
    },
    orangeText: {
      color: Res.Colors.loginAccent
    },
    hintText: {
      color: Res.Colors.loginHint,
      marginBottom: 9
    },
    loadingContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignSelf: 'stretch',
      alignItems: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: Res.Colors.windowBackground,
      opacity: 0.9
    },
    errorMessage: {
      color: 'red',
      fontSize: 10,
      marginTop: 2
    }
  });
  
  export default styles;
  