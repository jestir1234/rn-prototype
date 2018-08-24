import React, { PureComponent } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import * as Res from "../../res";
import MealView from "../../components/MealView.js";
import { connect } from "react-redux";
import { MealAction } from "../../actions";
import backgroundImage from "../../res/image/load.jpg";
import CookingView from "../../components/CookingView.js";

const TEST_WEEK = "2018-W35";

class _cookingScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <CookingView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundView: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    width: "100%",
    height: "100%",
    position: "absolute"
  },
  backgroundImageView: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  rootContainer: {
    backgroundColor: Res.Colors.windowBackground,
    flex: 1,
    width: "100%",
    height: "100%"
  }
});

const mapStateToProps = state => {
  console.log("HERE IS THE STATE", state);
  return {
    meals: state.meals.data,
    loading: state.meals.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadMealsRequested: week => {
      dispatch(MealAction.fetchMenus(week));
    }
  };
};

const cookingScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(_cookingScreen);

export default cookingScreen;
