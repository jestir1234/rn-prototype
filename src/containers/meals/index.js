import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import MealView from '../../components/MealView.js'
import { connect } from 'react-redux'
import { MealAction } from '../../actions'

class _mealsScreen extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onLoadMealsRequested();
  }

  render() {
    const list = (this.props.meals != null && this.props.meals.length > 0)
      ? (
        <FlatList
          data={this.props.meals}
          renderItem={this._renderListItem}
          keyExtractor={(meal, index) => meal.id }
        />
      )
      : (
        <Text></Text>
      );
    return (
      <View>
        {list}
      </View>
    );
  }

  _renderListItem(renderItem) {
    return (
      <MealView meal={renderItem.item} />
    );
  }
}

const styles = StyleSheet.create({

})

const mapStateToProps = (state) => {
  return {
    meals: state.data,
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadMealsRequested: () => {
      dispatch(MealAction.newActionLoadMeals())
    }
  }
}

const MealsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(_mealsScreen)

export default MealsScreen;
