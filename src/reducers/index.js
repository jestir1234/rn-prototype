import { combineReducers } from 'redux'
import mealReducer from './meals.js'
import userReducer from './user.js'
import deliveryReducer from './delivery.js'
import { persistReducer } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const ROOT_STORAGE_KEY = 'ROOT_STORAGE_KEY'
const USER_INFO_STORAGE_KEY = 'USER_INFO_STORAGE_KEY'

const userPersistConfig = {
  key: USER_INFO_STORAGE_KEY,
  storage,
  stateReconciler: hardSet,
  whitelist: ['userInfo']
}

const rootPersistConfig = {
  key: ROOT_STORAGE_KEY,
  storage,
  stateReconciler: hardSet,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  delivery: deliveryReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
