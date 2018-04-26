import { combineReducers } from 'redux'
import mealReducer from './meals.js'
import userReducer from './user.js'
import deliveryReducer from './delivery.js'

export default combineReducers({
  user: userReducer,
  delivery: deliveryReducer
});
