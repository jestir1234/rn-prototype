import React, { PureComponent, Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import PropTypes from 'prop-types'
import { Delivery, DeliveryPropType, DeliveryStatus } from '../../../entities'
import XDate from 'xdate'
import styles from './style.js'
import * as Res from '../../../res'

export default class DeliveryPopupView extends Component {
  static propTypes = {
    delivery: DeliveryPropType.isRequired,
    onViewMenuPressed: PropTypes.func,
    onSkipPressed: PropTypes.func,
    onUnskipPressed: PropTypes.func,
    onClosePressed: PropTypes.func
  };
  static measuredHeight = () => {
    return StyleSheet.flatten(styles.popupContainer).height;
  };

  constructor(props) {
    super(props);
  }

  render() {
    let { delivery } = this.props
    let now = new XDate()
    let deliveryDate = new XDate(delivery.deliveryDate)
    let cutoffDate = new XDate(delivery.cutoffDate)

    let isPast = now.diffSeconds(deliveryDate) <= 0
    let isBeforeCutoff = now.diffSeconds(cutoffDate) > 0

    if(isBeforeCutoff) {
      switch(delivery.status) {
        case DeliveryStatus.DELIVERED:
        case DeliveryStatus.RUNNING: return this._renderWaitingForDeliveryBeforeCutoff();
        case DeliveryStatus.SKIPPED:
        case DeliveryStatus.PAUSED: return this._renderSkippedBeforeCutoff();
        case DeliveryStatus.DELETED:
        case DeliveryStatus.CANCELLED: return this._renderSkippedAfterCutoffDate()
        default:
          console.log('We should hande delivery popup case: BeforeCutoff, ' + delivery.status)
      }
    } else {
      switch(delivery.status) {
        case DeliveryStatus.DELIVERED:
        case DeliveryStatus.RUNNING: return this._renderWaitingForDeliveryAfterCutoff()
        case DeliveryStatus.CANCELLED:
        case DeliveryStatus.DELETED:
        case DeliveryStatus.SKIPPED:
        case DeliveryStatus.PAUSED: return this._renderSkippedAfterCutoffDate()
        default:
          console.log('We should hande delivery popup case: AfterCutoff, ' + delivery.status)
      }
    }
  }

  _renderWaitingForDeliveryBeforeCutoff() {
    let { delivery } = this.props;
    return (
      <View style={styles.popupContainer}>
        <View style={styles.popupTitleContainer}>
          <Icon name={'calendar'} type={'Entypo'} style={styles.popupTitleIcon}/>
          <Text style={styles.popupTitle}>{new XDate(delivery.deliveryDate).toString('dddd, MMMM d')}</Text>
        </View>
        <View style={styles.popupSubtitleContainer}>
          <Text style={styles.popupSubtitleMessage}>{Res.Strings.schedule_ChangeMealsOrSkip}</Text>
          <Text style={styles.popupSubtitleDate}>{new XDate(delivery.cutoffDate).toString('dddd, MMMM d')}</Text>
        </View>
        <View style={styles.popupButtonContainer}>
          <TouchableHighlight style={[styles.popupButtonImportant, styles.popupButtonLeft]} onPress={this._onViewMenuPressed} underlayColor={Res.Colors.primaryDark}>
            <Text style={styles.popupButtonImportantText}>{Res.Strings.schedule_ViewMenu}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.popupButtonNonImportant, styles.popupButtonRight]} onPress={this._onSkipPressed} underlayColor={Res.Colors.nonImportantButtonDark}>
            <Text style={styles.popupButtonNonImportantText}>{Res.Strings.schedule_SkipWeeks}</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.popupClose} onPress={this._onClosePressed} underlayColor={Res.Colors.windowBackground}>
          <Icon name={'close'} type={'EvilIcons'} style={styles.popupCloseIcon}/>
        </TouchableHighlight>
      </View>
    );
  }

  _renderSkippedBeforeCutoff() {
    let { delivery } = this.props;
    return (
      <View style={styles.popupContainer}>
        <View style={styles.popupTitleContainer}>
          <Icon name={'calendar'} type={'Entypo'} style={styles.popupTitleIcon}/>
          <Text style={styles.popupTitle}>{new XDate(delivery.deliveryDate).toString('dddd, MMMM d')}</Text>
        </View>
        <View style={styles.popupSubtitleContainer}>
          <Text style={styles.popupSubtitleMessage}>{Res.Strings.schedule_UnskipWeekBy}</Text>
          <Text style={styles.popupSubtitleDate}>{new XDate(delivery.cutoffDate).toString('dddd, MMMM d')}</Text>
        </View>
        <View style={styles.popupButtonContainer}>
          <TouchableHighlight style={styles.popupButtonImportant} onPress={this._onUnskipPressed} underlayColor={Res.Colors.primaryDark}>
            <Text style={styles.popupButtonImportantText}>{Res.Strings.schedule_UnskipWeek}</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.popupClose} onPress={this._onClosePressed} underlayColor={Res.Colors.windowBackground}>
          <Icon name={'close'} type={'EvilIcons'} style={styles.popupCloseIcon}/>
        </TouchableHighlight>
      </View>
    );
  }

  _renderWaitingForDeliveryAfterCutoff() {
    let { delivery } = this.props;
    let now = new XDate()
    let deliveryDate = new XDate(delivery.deliveryDate)
    let diffDeliveryDays = Math.floor(now.diffDays(deliveryDate))

    let boxStatus = null;
    if(diffDeliveryDays < 0) {
      boxStatus = <Text style={styles.popupSubtitleSuccess}>{Res.Strings.schedule_Delivered}</Text>
    } else if(diffDeliveryDays == 0) {
      boxStatus = <Text style={styles.popupTag}>{Res.Strings.schedule_Shipped}</Text>
    } else if(diffDeliveryDays == 1) {
      boxStatus = <Text style={styles.popupTag}>{Res.Strings.schedule_PreparingMeals}</Text>
    } else if(diffDeliveryDays >= 2 && diffDeliveryDays <= 4) {
      boxStatus = <Text style={styles.popupTag}>{Res.Strings.schedule_BuyingIngredients}</Text>
    } else if(diffDeliveryDays >= 5) {
      boxStatus = <Text style={styles.popupTag}>{Res.Strings.schedule_CreatingOrders}</Text>
    }

    return (
      <View style={styles.popupContainer}>
        <View style={styles.popupTitleContainer}>
          <Icon name={'calendar'} type={'Entypo'} style={styles.popupTitleIcon}/>
          <Text style={styles.popupTitle}>{new XDate(delivery.deliveryDate).toString('dddd, MMMM d')}</Text>
        </View>
        <View style={styles.popupSubtitleContainer}>
          <Text style={styles.popupSubtitleMessage}>{Res.Strings.schedule_BoxStatus}</Text>
          {boxStatus}
        </View>
        <View style={styles.popupButtonContainer}>
          <TouchableHighlight style={styles.popupButtonImportant} onPress={this._onViewMenuPressed} underlayColor={Res.Colors.primaryDark}>
            <Text style={styles.popupButtonImportantText}>{Res.Strings.schedule_ViewMenu}</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.popupClose} onPress={this._onClosePressed} underlayColor={Res.Colors.windowBackground}>
          <Icon name={'close'} type={'EvilIcons'} style={styles.popupCloseIcon}/>
        </TouchableHighlight>
      </View>
    );
  }

  _renderSkippedAfterCutoffDate() {
    let { delivery } = this.props;
    return (
      <View style={styles.popupContainer}>
        <View style={styles.popupTitleContainer}>
          <Icon name={'calendar'} type={'Entypo'} style={styles.popupTitleIcon}/>
          <Text style={styles.popupTitle}>{new XDate(delivery.deliveryDate).toString('dddd, MMMM d')}</Text>
        </View>
        <View style={styles.popupSubtitleContainer}>
          <Text style={styles.popupSubtitleMessage}>{Res.Strings.schedule_BoxStatus}</Text>
          <Text style={styles.popupSubtitleFail}>{Res.Strings.schedule_Skipped}</Text>
        </View>
        <View style={styles.popupButtonContainer}>
          <TouchableHighlight style={styles.popupButtonImportant} onPress={this._onViewMenuPressed} underlayColor={Res.Colors.primaryDark}>
            <Text style={styles.popupButtonImportantText}>{Res.Strings.schedule_ViewMenu}</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.popupClose} onPress={this._onClosePressed} underlayColor={Res.Colors.windowBackground}>
          <Icon name={'close'} type={'EvilIcons'} style={styles.popupCloseIcon}/>
        </TouchableHighlight>
      </View>
    );
  }

  _onViewMenuPressed = () => {
    if(this.props.onViewMenuPressed) {
      this.props.onViewMenuPressed(this.props.delivery)
    }
  }

  _onSkipPressed = () => {
    if(this.props.onSkipPressed) {
      this.props.onSkipPressed(this.props.delivery)
    }
  }

  _onUnskipPressed = () => {
    if(this.props.onUnskipPressed) {
      this.props.onUnskipPressed(this.props.delivery)
    }
  }

  _onClosePressed = () => {
    if(this.props.onClosePressed) {
      this.props.onClosePressed(this.props.delivery)
    }
  }
};
