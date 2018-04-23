import { StyleSheet } from 'react-native';

const HEADER_HEIGHT = 30
const ROW_HEIGHT = 50
const MONTH_HEIGHT = 6 * ROW_HEIGHT + HEADER_HEIGHT
const DAY_CIRCLE_SIZE = 32
const COLOR_GREEN = '#50d691'
const COLOR_RED = '#f95d62'

export const customFilledCircle = (color, borderWidth = 1) => {
  return {
    customStyles: {
      container: {
        backgroundColor: 'white'
      },
      text: {
        color: 'white',
        borderWidth: borderWidth,
        borderRadius: 100,
        backgroundColor: color,
        borderColor: 'white'
      }
    }
  }
};

export const customOutlineCircle = (color, borderWidth = 1) => {
  return {
    customStyles: {
      container: {
        backgroundColor: 'white'
      },
      text: {
        color: color,
        borderWidth: borderWidth,
        borderRadius: 100,
        borderColor: color
      }
    }
  }
};

export const theme = {
  selectedDayBackgroundColor: COLOR_RED,
  selectedDayTextColor: '#ffffff',
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
      height: ROW_HEIGHT
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
      textAlignVertical: 'center'
    },
    dot: {
      position: 'absolute',
      width: 4,
      height: 4,
      marginTop: 35,
      borderRadius: 2,
      opacity: 0
    },
    selected: {
      backgroundColor: COLOR_GREEN,
      borderRadius: 100
    },
    selectedText: {
      color: '#ffffff'
    }
  },
  'stylesheet.day.basic': {
    selected: {
      backgroundColor: COLOR_GREEN,
      borderRadius: 100
    },
    selectedText: {
      color: '#ffffff'
    }
  },
  'stylesheet.calendar-list.main': {
    calendar: {
      height: MONTH_HEIGHT
    }
  }
};
