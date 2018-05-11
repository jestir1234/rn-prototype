import { StyleSheet } from 'react-native'
import * as Res from '../../../../res'

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Res.Colors.windowBackground
  },
  image: {
    alignSelf: 'stretch',
    resizeMode: 'contain'
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16
  },
  title: {
    color: Res.Colors.primaryText,
    fontSize: 20,
    fontWeight: 'bold'
  },
  titleDate: {
    color: Res.Colors.primaryText,
    fontSize: 20,
    fontWeight: 'bold'
  },
  subtitle: {
    color: Res.Colors.secondaryText,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 24
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 24
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: Res.Colors.primary,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 24
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: Res.Colors.nonImportantButton,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24
  },
  buttonPrimaryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonSecondaryText: {
    color: Res.Colors.primaryText,
    fontSize: 16,
    fontWeight: 'bold'
  },
  close: {
    position: 'absolute',
    right: 0,
    marginRight: 3,
    marginTop: 8
  },
  closeIcon: {
    fontSize: 20,
    color: 'white'
  }
});

export default styles;
