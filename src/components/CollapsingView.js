import React, { PureComponent, Component } from 'react'
import { View, Animated } from 'react-native'
import PropTypes from 'prop-types'

export default class CollapsingView extends Component {
  static propTypes = {
    collapsingHeight: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      animatedHeight: new Animated.Value(this.props.collapsingHeight)
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.animatedHeight,
      {
        toValue: 0,
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
