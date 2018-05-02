import React, { PureComponent, Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import * as Res from '../../res'
import styles from './style.js'
import { CalendarView, CalendarStyles } from '../../components/CalendarView'
import { ExpandingView, CollapsingView } from '../../components'
import { connect } from 'react-redux'
import { DeliveryAction } from '../../actions'
import DeliveryPopupView from './popup'
import XDate from 'xdate'

class _scheduleScreen extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      deliveries: [],
      lastDeliveryPopup: null,
      externalViews: {}
    };
  }

  componentDidMount() {
    let displayRange = this._displayWeekRange();
    this.props.onLoadMealsRequested(displayRange.firstWeek, displayRange.lastWeek);
  }

  render() {
    const root = (this.props.loading) ? this._renderLoading()
      : (this.props.error) ? this._renderError()
      : this._renderDeliveries();

    return root;
  }

  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Res.Colors.primary} />
      </View>
    );
  }

  _renderError() {
    return (
      <View style={styles.errorContainer}>
        <Text>{this.props.error}</Text>
      </View>
    );
  }

  _onDaySelected(day) {
    let delivery = this.props.deliveries.find(item =>
      item.deliveryDate.getFullYear() === day.year &&
      item.deliveryDate.getMonth() + 1 === day.month &&
      item.deliveryDate.getDate() === day.day
    )
    let expands = {};
    let newDeliveryPopup = null;
    if(delivery) {
      expands = {
        [day.dateString]: <ExpandingView key={`Expand-${day.dateString}`} expandingHeight={DeliveryPopupView.measuredHeight()} duration={250}><DeliveryPopupView delivery={delivery} /></ExpandingView>
      };
      newDeliveryPopup = { date: day.dateString, delivery: delivery };
    }

    let collapses = {};
    if(this.state.lastDeliveryPopup) {
      let { lastDeliveryPopup } = this.state;
      collapses = {
        [lastDeliveryPopup.date]: <CollapsingView key={`Collapse-${lastDeliveryPopup.date}`} collapsingHeight={DeliveryPopupView.measuredHeight()} duration={250}><DeliveryPopupView delivery={lastDeliveryPopup.delivery} /></CollapsingView>
      };
    }

    this.setState({
      externalViews: Object.assign({}, collapses, expands),
      lastDeliveryPopup: newDeliveryPopup
    });
  }

  _renderDeliveries() {
    return (
      <View style={styles.listContainer}>
        <CalendarView
          futureScrollRange={this._displayWeekRange().monthCount}
          defaultSelectedDateStyle={ CalendarStyles.customFilledCircle(Res.Colors.scheduleNonDelivery) }
          datesStyle={this._styledDates()}
          dynamicHeight={true}
          onDaySelected={day => this._onDaySelected(day)}
          externalViews={this.state.externalViews}
        />
      </View>
    );
  }

  _styledDates() {
    let outlineDelivery = CalendarStyles.customOutlineCircle(Res.Colors.primary);
    let fillDelivery = CalendarStyles.customFilledCircle(Res.Colors.primary);
    let outlineNonDelivery = CalendarStyles.customOutlineCircle(Res.Colors.secondary);
    let fillNonDelivery = CalendarStyles.customFilledCircle(Res.Colors.secondary);

    let deliveryDays = this._deliveryDays(this.props.deliveries)
      .map(item => { return { [item]: { normal: outlineDelivery, selected: fillDelivery } } })
    let nonDeliveryDays = this._nonDeliveryDays(this.props.deliveries)
      .map(item => { return { [item]: { normal: outlineNonDelivery, selected: fillNonDelivery } } })
    return Object.assign({}, ...deliveryDays, ...nonDeliveryDays);
  }

  _deliveryDays(deliveries) {
    return deliveries
      .filter(item => item.status === 'DELIVERED' || item.status === 'RUNNING')
      .map(item => new XDate(item.deliveryDate).toString('yyyy-MM-dd'))
  }

  _nonDeliveryDays(deliveries) {
    return deliveries
      .filter(item => item.status !== 'DELIVERED' && item.status !== 'RUNNING')
      .map(item => new XDate(item.deliveryDate).toString('yyyy-MM-dd'))
  }

  _displayWeekRange() {
    let startDate = new XDate();
    startDate.setDate(1);
    let firstWeek = `${startDate.toString('yyyy')}-W${startDate.toString('ww')}`;

    let endDate = new XDate(startDate);
    endDate.addWeeks(12);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);
    let lastWeek = `${endDate.toString('yyyy')}-W${endDate.toString('ww')}`;

    let monthCount = endDate.getMonth() - startDate.getMonth();

    return {
      firstWeek,
      lastWeek,
      monthCount
    }
  }
}

const mapStateToProps = (state) => {
  return {
    deliveries: state.delivery.deliveries,
    loading: state.delivery.isLoading,
    error: state.delivery.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadMealsRequested: (firstWeek, lastWeek) => {
      dispatch(DeliveryAction.loadDeliveries(firstWeek, lastWeek))
    }
  }
}

const ScheduleScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(_scheduleScreen)

export default ScheduleScreen;
