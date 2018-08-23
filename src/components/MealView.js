import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Card } from "native-base";
import { Recipe, MealPropType } from "../entities/Meal.js";
import MealTagView from "./MealTagView.js";

export default class MealView extends Component {
  render() {
    console.log(this.props);
    if (this.props.meal == null || !(this.props.meal instanceof Recipe)) {
      throw "No 'meal' property provided for MealView.";
    }

    console.log("MealView:");
    console.log(this.props.meal);

    return (
      <TouchableOpacity>
        <Card style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: this.props.meal.imageLink }}
          />
          <View style={styles.footer}>
            <Text style={styles.title}>{this.props.meal.name}</Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={styles.subtitle}
            >
              {this.props.meal.headline}
            </Text>
            {/* <MealTagView style={styles.tags} tags={this.props.meal.tags} /> */}
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

MealView.propTypes = {
  meal: PropTypes.instanceOf(MealPropType).isRequired
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: -1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "stretch",
    alignItems: "stretch",
    backgroundColor: "white",
    marginLeft: 4,
    marginRight: 4
  },
  image: {
    alignSelf: "stretch",
    aspectRatio: 3 / 2
  },
  footer: {
    display: "flex",
    flex: -1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "stretch",
    alignItems: "stretch",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8
  },
  title: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8
  },
  subtitle: {
    color: "#777",
    fontSize: 14,
    marginTop: 8
  },
  tags: {
    marginTop: 8
  },
  price: {
    color: "#777",
    fontSize: 16,
    marginTop: 8
  }
});
