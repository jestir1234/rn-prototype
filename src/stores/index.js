import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from '../reducers'
import { persistStore } from 'redux-persist'

export default () => {
  let store = createStore(reducer, applyMiddleware(thunkMiddleware))
  let persistor = persistStore(store)
  return { store, persistor }
}
