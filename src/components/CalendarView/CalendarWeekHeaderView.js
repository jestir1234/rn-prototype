import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'

export default class CalendarWeekHeaderView extends Component {
  static propTypes = {
    dayNames: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        {this._weekTitle()}
      </View>
    );
  }

  _weekTitle() {
    return (
      <View style={styles.weekTitleContainer}>
        <View style={styles.weekTitleItemContainer}>{this._weekTitleItem(WeekDay.Sunday)}</View>
        <View style={styles.weekTitleItemContainer}>{this._weekTitleItem(WeekDay.Monday)}</View>
        <View style={styles.weekTitleItemContainer}>{this._weekTitleItem(WeekDay.Tuesday)}</View>
        <View style={styles.weekTitleItemContainer}>{this._weekTitleItem(WeekDay.Wednesday)}</View>
        <View style={styles.weekTitleItemContainer}>{this._weekTitleItem(WeekDay.Thursday)}</View>
        <View style={styles.weekTitleItemContainer}>{this._weekTitleItem(WeekDay.Friday)}</View>
        <View style={styles.weekTitleItemContainer}>{this._weekTitleItem(WeekDay.Saturday)}</View>
      </View>
    );
  }
  _weekTitleItem(weekDay) {
    let dayName = this.props.dayNames[weekDay];
    return (<Text style={styles.weekTitleItem}>{dayName}</Text>);
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 24,
    display: 'flex',
    paddingLeft: 4,
    paddingRight: 4,
    flex: -1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  weekTitleContainer: {
    display: 'flex',
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  weekTitleItemContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  weekTitleItem: {
    textAlign: 'center'
  }
});

const WeekDay = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
};
