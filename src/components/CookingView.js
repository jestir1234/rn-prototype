import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Card } from "native-base";
import { Recipe, MealPropType } from "../entities/Meal.js";
import MealTagView from "./MealTagView.js";

export default class CookingView extends Component {
  render() {
    return (
      <View>
        <Text>COOKING GOES HERE</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
