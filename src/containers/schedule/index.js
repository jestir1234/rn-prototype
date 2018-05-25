import React, { PureComponent, Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { Toast } from 'native-base'
import * as Res from '../../res'
import styles from './style.js'
import { CalendarView, CalendarStyles } from '../../components/CalendarView'
import { ExpandingView, CollapsingView } from '../../components'
import { connect } from 'react-redux'
import { DeliveryAction } from '../../actions'
import DeliveryPopupView from './popup'
import { SkipDialog } from './dialog'
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
    let list = this.props.deliveries ? this._renderDeliveries() : null;
    let progress = this.props.loading ? this._renderLoading() : null;
    let message = this.props.error ? this._renderError() : null;
    let skipDialog = this.state.lastDeliveryPopup
      ? (<SkipDialog
        ref={dialog => { this.skipDialog = dialog; }}
        date={this.state.lastDeliveryPopup.date}
        onSkip={date => this._onSkipConfirmed(date)} />)
      : null;

    return (
      <View testID='CalendarTestid' style={Res.Styles.safeAreaTop}>
        <View style={styles.rootContainer}>
          {list}
          {message}
          {progress}
          {skipDialog}
        </View>
      </View>
    )
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
    let selectedDate = new XDate(day)
    let delivery = this.props.deliveries.find(item =>
      item.deliveryDate.getFullYear() === selectedDate.getFullYear() &&
      item.deliveryDate.getMonth() === selectedDate.getMonth() &&
      item.deliveryDate.getDate() === selectedDate.getDate()
    )
    let expands = {};
    let newDeliveryPopup = null;
    if (delivery) {
      let popup = (
        <DeliveryPopupView
          delivery={delivery}
          onSkipPressed={delivery => this._onSkipPressed(delivery)}
          onUnskipPressed={delivery => this._onUnskipPressed(delivery)}
          onViewMenuPressed={delivery => this._onViewMenuPressed(delivery)}
          onClosePressed={delivery => this._onClosePopupPressed(delivery)} />
      )
      expands = {
        [day]: <ExpandingView key={`Expand-${day}`} expandingHeight={DeliveryPopupView.measuredHeight()} duration={250}>{popup}</ExpandingView>
      };
      newDeliveryPopup = { date: day, delivery: delivery };
    }

    let collapses = {};
    if (this.state.lastDeliveryPopup) {
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
          defaultSelectedDateStyle={CalendarStyles.customFilledCircle(Res.Colors.scheduleNonDelivery)}
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
    endDate.addWeeks(Res.Configs.CALENDAR_DISPLAY_WEEKS_RANGE);
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

  _onSkipPressed(delivery) {
    this.skipDialog.show();
  }

  _onSkipConfirmed(day) {
    let selectedDate = new XDate(day)
    let delivery = this.props.deliveries.find(item =>
      item.deliveryDate.getFullYear() === selectedDate.getFullYear() &&
      item.deliveryDate.getMonth() === selectedDate.getMonth() &&
      item.deliveryDate.getDate() === selectedDate.getDate()
    )

    if (delivery) {
      this.props.onSkipDeliveryRequested(delivery)
        .then(newDelivery => this._refreshPopupForDelivery(newDelivery))
    }
  }

  _onUnskipPressed(delivery) {
    this.props.onUnskipDeliveryRequested(delivery)
      .then(newDelivery => this._refreshPopupForDelivery(newDelivery))
  }

  _refreshPopupForDelivery(newDelivery) {
    let dateString = new XDate(newDelivery.deliveryDate).toString('yyyy-MM-dd')
    let popup = (
      <DeliveryPopupView
        key={`Popup-${dateString}`}
        delivery={newDelivery}
        onSkipPressed={delivery => this._onSkipPressed(delivery)}
        onUnskipPressed={delivery => this._onUnskipPressed(delivery)}
        onViewMenuPressed={delivery => this._onViewMenuPressed(delivery)} />
    )
    popups = {
      [dateString]: popup
    };
    newDeliveryPopup = { date: dateString, delivery: newDelivery };

    let newExternalViews = Object.assign({}, this.state.externalViews, popups);
    this.setState({
      externalViews: newExternalViews,
      lastDeliveryPopup: newDeliveryPopup
    })
  }

  _onViewMenuPressed(delivery) {
    Toast.show({ text: 'Not Implemented Yet!' })
  }

  _onClosePopupPressed(delivery) {
    let collapses = {};
    if (this.state.lastDeliveryPopup) {
      let { lastDeliveryPopup } = this.state;
      collapses = {
        [lastDeliveryPopup.date]: <CollapsingView key={`Collapse-${lastDeliveryPopup.date}`} collapsingHeight={DeliveryPopupView.measuredHeight()} duration={250}><DeliveryPopupView delivery={lastDeliveryPopup.delivery} /></CollapsingView>
      };
    }

    this.setState({
      externalViews: Object.assign({}, collapses),
      lastDeliveryPopup: undefined
    });
  }
}

const mapStateToProps = (state) => {
  return {
    deliveries: state.delivery.deliveries,
    loading: state.delivery.isLoading,
    error: state.delivery.error,
    editError: state.delivery.editError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadMealsRequested: (firstWeek, lastWeek) => {
      return dispatch(DeliveryAction.loadDeliveries(firstWeek, lastWeek))
    },
    onSkipDeliveryRequested: (delivery) => {
      return dispatch(DeliveryAction.skipDelivery(delivery))
    },
    onUnskipDeliveryRequested: (delivery) => {
      return dispatch(DeliveryAction.unskipDelivery(delivery))
    }
  }
}

const ScheduleScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(_scheduleScreen)

export default ScheduleScreen;
