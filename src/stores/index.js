import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { userReducer } from '../reducers'

const store = createStore(userReducer, applyMiddleware(thunkMiddleware))

export default store;
