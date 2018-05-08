import { StyleSheet, Platform } from 'react-native';

const HEADER_HEIGHT = 30
const ROW_HEIGHT = 50
const MONTH_HEIGHT = 6 * ROW_HEIGHT + HEADER_HEIGHT
const DAY_CIRCLE_SIZE = 32

export const customFilledCircle = (color, borderWidth = 1) => {
  return {
    customStyles: {
      container: {
        backgroundColor: 'white',
        height: ROW_HEIGHT - 1
      },
      background: {
        width: DAY_CIRCLE_SIZE,
        height: DAY_CIRCLE_SIZE,
        borderWidth: DAY_CIRCLE_SIZE / 2,
        borderRadius: DAY_CIRCLE_SIZE / 2,
        backgroundColor: 'white',
        borderColor: color
      },
      text: {
        color: 'white',
        position: 'absolute',
        height: DAY_CIRCLE_SIZE,
        ...Platform.select({
          ios: {
            paddingTop:  (ROW_HEIGHT - DAY_CIRCLE_SIZE) / 2 - 1
          }
        })
      }
    }
  }
};

export const customOutlineCircle = (color, borderWidth = 1) => {
  return {
    customStyles: {
      container: {
        backgroundColor: 'white',
        height: ROW_HEIGHT - 1
      },
      background: {
        width: DAY_CIRCLE_SIZE,
        height: DAY_CIRCLE_SIZE,
        borderWidth: 1,
        borderRadius: DAY_CIRCLE_SIZE / 2,
        backgroundColor: 'white',
        borderColor: color
      },
      text: {
        color: color,
        position: 'absolute',
        height: DAY_CIRCLE_SIZE,
        ...Platform.select({
          ios: {
            paddingTop: (ROW_HEIGHT - DAY_CIRCLE_SIZE) / 2 - 1
          }
        })
      }
    }
  }
};

export const theme = (dynamicHeight) => {
  let normStyles = {
    'stylesheet.calendar.header': {
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        borderBottomColor: '#EEE',
        borderBottomWidth: 1,
        height: HEADER_HEIGHT
      },
      monthText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#555'
      }
    },
    'stylesheet.calendar.main': {
      week: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomColor: '#EEE',
        borderBottomWidth: 1,
        height: ROW_HEIGHT,
        backgroundColor: 'white'
      }
    },
    'stylesheet.day.single': {
      base: {
        width: 32,
        height: ROW_HEIGHT - 2,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      },
      text: {
        width: DAY_CIRCLE_SIZE,
        height: DAY_CIRCLE_SIZE,
        textAlign: 'center',
        textAlignVertical: 'center',
        ...Platform.select({
          ios: {
            paddingTop: (ROW_HEIGHT - DAY_CIRCLE_SIZE) / 2
          }
        })
      },
      dot: {
        position: 'absolute',
        width: 4,
        height: 4,
        marginTop: 35,
        borderRadius: 2,
        opacity: 0
      }
    }
  };
  let calendarHeightStyle = dynamicHeight
    ? {
      'stylesheet.calendar-list.main': {
        calendar: {
          paddingLeft: 4,
          paddingRight: 4
        }
      }
    } : {
      'stylesheet.calendar-list.main': {
        calendar: {
          paddingLeft: 4,
          paddingRight: 4,
          height: MONTH_HEIGHT
        }
      }
  };

  return Object.assign({}, normStyles, calendarHeightStyle);
};

export const calendar = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'white'
  }
});
