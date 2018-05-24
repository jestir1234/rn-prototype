import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from '../reducers'
import { persistStore } from 'redux-persist'
import * as NetworkManager from '../model/network/api.js'

const store = createStore(reducer, applyMiddleware(thunkMiddleware.withExtraArgument(NetworkManager)))
const persistor = persistStore(store)

export default () => {
  NetworkManager.setStore(store)
  return { store, persistor }
};