import React, { PureComponent } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import * as Res from "../../res";
import MealView from "../../components/MealView.js";
import { connect } from "react-redux";
import { MealAction } from "../../actions";
import backgroundImage from "../../res/image/load.jpg";

const TEST_WEEK = "2018-W35";

class _mealsScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onLoadMealsRequested(TEST_WEEK);
  }

  render() {
    if (this.props.meals.length === 0) {
      return (
        <View style={styles.backgroundView}>
          <Image
            source={backgroundImage}
            onLoadStart={() => this.setState({ backgroundLoading: true })}
            style={styles.backgroundImageView}
          />
        </View>
      );
    }
    const list =
      this.props.meals != null && this.props.meals.length > 0 ? (
        <FlatList
          data={this.props.meals}
          renderItem={({ item }) => this._renderListItem(item)}
          keyExtractor={(meal, index) => meal.id}
        />
      ) : (
        <Text />
      );
    return (
      <View style={Res.Styles.safeAreaTop}>
        <View style={styles.rootContainer}>{list}</View>
      </View>
    );
  }

  _renderListItem(renderItem) {
    console.log(renderItem, "renderItems");
    return <MealView meal={renderItem} />;
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

const MealsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(_mealsScreen);

export default MealsScreen;
