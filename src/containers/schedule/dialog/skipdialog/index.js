import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Text, Image, TouchableHighlight } from 'react-native'
import PopupDialog from 'react-native-popup-dialog'
import PropTypes from 'prop-types'
import styles from './style.js'
import * as Res from '../../../../res'
import XDate from 'xdate'

export default class SkipDialog extends Component {
  static _IMAGE_ASPECT_RATIO = 2.34
  static propTypes = {
    date: PropTypes.string.isRequired,
    onSkip: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  show() {
    this.popupDialog.show();
  }

  dismiss() {
    this.popupDialog.dismiss();
  }

  render() {
    let width = Dimensions.get('window').width - 32;
    let imageHeight = width / SkipDialog._IMAGE_ASPECT_RATIO;
    let height = 240 + imageHeight;
    let formattedDate = new XDate(this.props.date).toString('MMMM d')

    return (
      <PopupDialog
        width={width}
        height={height}
        ref={popupDialog => { this.popupDialog = popupDialog; }}>
        <View style={styles.rootContainer}>
          <Image
            style={[styles.image, { width: width, height: imageHeight}]}
            source={require('../../../../res/image/skip_dialog.png')} />
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>{Res.Strings.schedule_SkipDeliveryFor}</Text>
            <Text style={styles.titleDate}>{formattedDate}</Text>
            <Text style={styles.subtitle}>{Res.Strings.schedule_SkipDeliveryMessage}</Text>
            <View style={styles.buttonContainer}>
              <TouchableHighlight style={styles.buttonSecondary} onPress={this._onCancelPressed}>
                <Text style={styles.buttonSecondaryText}>{Res.Strings.schedule_SkipDeliveryCancel}</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.buttonPrimary} onPress={this._onSkipPressed}>
                <Text style={styles.buttonPrimaryText}>{Res.Strings.schedule_SkipDeliverySkipWeek}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </PopupDialog>
    )
  }

  _onSkipPressed = () => {
    this.dismiss()
    if(this.props.onSkip) {
      this.props.onSkip(this.props.date)
    }
  };

  _onCancelPressed = () => {
    this.dismiss()
  };
}
