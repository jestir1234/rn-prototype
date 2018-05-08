import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types'
import CalendarWeekHeaderView from './CalendarWeekHeaderView.js'
import * as Res from '../../res'
import { Calendar, CalendarList, Agenda, LocaleConfig } from '../ReactNativeCalendar'
import * as Styles from './style.js'
import XDate from 'xdate'

export default class CalendarView extends Component {
  static propTypes = {
    ...CalendarList.propTypes,

    datesStyle: PropTypes.object,
    defaultSelectedDateStyle: PropTypes.object,
    onDaySelected: PropTypes.func,
    dynamicHeight: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: XDate(Date.now()).toString('yyyy-MM-dd'),
      markedDates: {}
    };
    this._initLocale();
  }

  _initLocale() {
    LocaleConfig.locales['en'] = Object.assign({}, LocaleConfig.locales['en'], {
      monthNames: Res.Strings.calendar_MonthNames,
      monthNamesShort: Res.Strings.calendar_MonthNamesShort,
      dayNames: Res.Strings.calendar_DayNames,
      dayNamesShort: Res.Strings.calendar_DayNamesShort
    });
    LocaleConfig.defaultLocale = 'en';
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newMarkedDates = Object.assign({}, CalendarView._getNormalStyles(nextProps.datesStyle), {
      [prevState.selectedDate]: CalendarView._getSelectedStyleForDate(nextProps.datesStyle, prevState.selectedDate, nextProps)
    });
    return {
      markedDates: newMarkedDates
    }
  }

  render() {
    return (
      <View style={{marginTop: 24}}>
        <CalendarWeekHeaderView
          dayNames={LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort}
        />
        <CalendarList
          hideDayNames={true}
          monthFormat={'MMMM'}
          capitalizeMonthName={true}
          pastScrollRange={0}
          futureScrollRange={6}
          onDayPress={(day) => this._changeCurrentDate(day)}
          markingType={'custom'}
          markedDates={this.state.markedDates}
          theme={Styles.theme(this.props.dynamicHeight)}
          {...this.props}
        />
      </View>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.selectedDate !== prevState.selectedDate) {
      this.props.onDaySelected(this.state.selectedDate)
    }
  }

  static _getNormalStyles(datesStyle) {
    let arrStyles = Object.keys(datesStyle).map((key) => { return { [key]: datesStyle[key].normal }});
    return Object.assign({}, ...arrStyles);
  }

  static _getSelectedStyleForDate(datesStyle, date, props) {
    let style = datesStyle[date];
    if(style !== undefined && style.selected !== undefined) {
      return style.selected
    } else {
      return props.defaultSelectedDateStyle
    }
  }

  _changeCurrentDate(day) {
    let dateString = day.dateString
    let markedDates = Object.freeze(Object.assign({}, CalendarView._getNormalStyles(this.props.datesStyle),
      { [dateString]: CalendarView._getSelectedStyleForDate(this.props.datesStyle, dateString, this.props) }
    ));
    this.setState({
      selectedDate: dateString,
      markedDates: markedDates
    });
  }
}
