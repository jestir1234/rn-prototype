import { StyleSheet } from 'react-native'
import * as Res from '../../res'

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Res.Colors.windowBackground,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  fieldsContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 16,
    width: '100%',
    height: '100%',
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
  header: {
    fontSize: 18,
  },
  logoutButton: {
    display: 'flex',
    backgroundColor: Res.Colors.primary,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
  
export default styles;
