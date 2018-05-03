import React, { PureComponent, Component } from 'react'
import { View, Animated } from 'react-native'
import PropTypes from 'prop-types'

export default class ExpandingView extends Component {
  static propTypes = {
    expandingHeight: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      animatedHeight: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.animatedHeight,
      {
        toValue: this.props.expandingHeight,
        duration: this.props.duration
      }
    ).start();
  }

  render() {
    let { animatedHeight } = this.state;

    return (
      <Animated.View
        style={{
          ...this.props.style,
          height: animatedHeight
        }}>
        {this.props.children}
      </Animated.View>
    );
  }
};
