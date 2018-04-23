import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types'
import CalendarWeekHeaderView from './CalendarWeekHeaderView.js'
import { Calendar, CalendarList, Agenda, LocaleConfig } from '../ReactNativeCalendar'
import * as Styles from './style.js'

const XDate = require('xdate');

export default class CalendarView extends Component {
  static propTypes = {
    ...CalendarList.propTypes,

    datesStyle: PropTypes.object,
    defaultSelectedDateStyle: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: XDate(Date.now()).toString('yyyy-MM-dd'),
      markedDates: {}
    };
    this.state.markedDates = Object.assign({}, this._getNormalStyles(this.props.datesStyle), {
      [this.state.selectedDate]: this._getSelectedStyleForDate(this.props.datesStyle, this.state.selectedDate)
    });
    this._initLocale();
  }

  _initLocale() {
    LocaleConfig.locales['en'] = Object.assign({}, LocaleConfig.locales['en'], {
      monthNames: ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
      monthNamesShort: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"]
    });
    LocaleConfig.defaultLocale = 'en';
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
          pastScrollRange={0}
          futureScrollRange={6}
          onDayPress={(day) => this._changeCurrentDate(day.dateString)}
          markingType={'custom'}
          markedDates={this.state.markedDates}
          theme={Styles.theme}
          {...this.props}
        />
      </View>
    );
  }

  _getNormalStyles(datesStyle) {
    let arrStyles = Object.keys(datesStyle).map((key) => { return { [key]: datesStyle[key].normal }});
    return Object.assign({}, ...arrStyles);
  }

  _getSelectedStyleForDate(datesStyle, date) {
    let style = datesStyle[date];
    if(style !== undefined && style.selected !== undefined) {
      return style.selected
    } else {
      return this.props.defaultSelectedDateStyle
    }
  }

  _changeCurrentDate(dateString) {
    let markedDates = Object.freeze(Object.assign({}, this._getNormalStyles(this.props.datesStyle),
      { [dateString]: this._getSelectedStyleForDate(this.props.datesStyle, dateString) }
    ));
    this.setState({
      selectedDate: dateString,
      markedDates: markedDates
    });
  }
}
