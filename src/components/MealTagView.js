import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { MealTag, MealTagPropType } from '../entities/MealTag.js'

export default class MealTagView extends Component {

  render() {
    if(this.props.tags == null) {
      return(
        <View />
      );
    }

    return (
      <View style={[styles.container, this.props.style]}>
        { this.props.tags.map((tag, index) =>
          <Text key={tag.name} style={this._tagStyle(tag, index)}>{tag.name.toUpperCase()}</Text> )}
      </View>
    );
  }

  _tagStyle(tag, index) {
    return [styles.tag, {backgroundColor: tag.color, marginLeft: index > 0 ? 4 : 0}];
  }
}

MealTagView.propTypes = {
  tags: PropTypes.arrayOf(MealTagPropType).isRequired
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start'
  },
  tag: {
    backgroundColor: '#777',
    color: '#fff',
    fontSize: 13,
    borderRadius: 4,
    padding: 4,
    paddingTop: 2,
    paddingBottom: 2
  }
});
