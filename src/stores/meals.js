import { createStore } from 'redux'
import { mealReducer } from '../reducers'

const store = createStore(mealReducer)

export default store;
