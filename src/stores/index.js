import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from '../reducers'
import { persistStore } from 'redux-persist'

/*const store = createStore(reducer, applyMiddleware(thunkMiddleware))
const persistor = persistStore(store)

export {
  store,
  persistor
}*/

export default () => {
  let store = createStore(reducer, applyMiddleware(thunkMiddleware))
  let persistor = persistStore(store)
  return { store, persistor }
};