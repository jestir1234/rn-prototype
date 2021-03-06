import { StyleSheet } from 'react-native'
import * as Res from '../../../res'

const styles = StyleSheet.create({
  popupContainer: {
    flex: -1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    height: 132,
    backgroundColor: 'white'
  },
  popupTitleContainer: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  popupTitleIcon: {
    fontSize: 20,
    color: Res.Colors.primaryText,
    marginTop: 4
  },
  popupTitle: {
    color: Res.Colors.primaryText,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 4
  },
  popupSubtitleContainer: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 4
  },
  popupSubtitleMessage: {
    color: Res.Colors.primaryText,
    fontSize: 13
  },
  popupSubtitleDate: {
    color: Res.Colors.primaryText,
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 8
  },
  popupTag: {
    backgroundColor: Res.Colors.scheduleTags,
    color: 'white',
    padding: 2,
    fontSize: 13,
    borderRadius: 2,
    marginLeft: 8
  },
  popupSubtitleFail: {
    color: Res.Colors.secondary,
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 8
  },
  popupSubtitleSuccess: {
    color: Res.Colors.primary,
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 8
  },
  popupButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 12
  },
  popupButtonImportant: {
    flexGrow: 1,
    backgroundColor: Res.Colors.primary,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popupButtonNonImportant: {
    flexGrow: 1,
    backgroundColor: Res.Colors.nonImportantButton,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popupButtonLeft: {
    marginRight: 4
  },
  popupButtonRight: {
    marginLeft: 4
  },
  popupButtonImportantText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  popupButtonNonImportantText: {
    color: Res.Colors.primaryText,
    fontSize: 16,
    fontWeight: 'bold'
  },
  popupClose: {
    position: 'absolute',
    right: 0,
    marginRight: 16,
    marginTop: 16
  },
  popupCloseIcon: {
    fontSize: 20,
    color: Res.Colors.primaryText
  }
});

export default styles;
