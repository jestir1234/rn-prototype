import { StyleSheet } from 'react-native'
import * as Res from '../../res'

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Res.Colors.windowBackground,
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
    backgroundColor: Res.Colors.loadingOverlay,
    display: 'flex',
    flex: 1,
    alignItems: 'stretch',
    width: '100%',
    height: '100%',
    position: 'absolute'
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
  text: {
    fontSize: 20,
    marginTop: 50,
    marginLeft: 50,
  }
});
  
export default styles;
