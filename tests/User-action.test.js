import * as actions from '../src/actions/user'
import * as userInfoEntities from '../src/entities/UserInfo'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect'

import * as Res from '../src/res'

import MockAsyncStorage from 'mock-async-storage'
const releaseAsyncStorageFunction = () => jest.unmock('AsyncStorage')
const mockAsyncStorageFunction = () => {
  const mockImpl = new MockAsyncStorage()
  jest.mock('AsyncStorage', () => mockImpl)
}

import { AsyncStorage } from 'react-native'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('user actions tests', () => {
  beforeEach(() => {
    mockAsyncStorageFunction()
  })
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
    releaseAsyncStorageFunction()
  })

  it('creates RECEIVED_AUTHENTICATION when login with correct credentials', () => {
    let username = 'correct_username@gmail.com'
    let password = 'correct_password'
    let userDataString = {
        id: 12345678,
        username: "correct_username",
        email: "correct_email",
        user_id: 123123,
        country: "DE",
        blocked: false,
        metadata: "correct_metadata",
        source_system: "correct_source_system",
        roles: "correct_roles"
    }
    let userData = new userInfoEntities.UserData(userDataString)
    let userInfoString = {
      access_token: "access_token_str",
      expires_in: 10000,
      refresh_token: "refresh_token_str",
      token_type: "token_type_str",
      user_data: userData
    }
    let userInfo = new userInfoEntities.UserInfo(userInfoString)

    fetchMock
      .postOnce('https://gw-staging.hellofresh.com/login?country=ML',
        { body: userInfo, headers: { 'content-type': 'application/json' } }
      )
    let expectedActions = [
      { type: actions.REQUEST_AUTHENTICATION},
      { type: actions.RECEIVED_USER_ERROR, authErrorMessage: " "},
      { type: actions.RECEIVED_PASSWORD_ERROR, authErrorMessage: " "},
      { type: actions.RECEIVED_AUTHENTICATION, userInfo: userInfo }
    ]
    let store = mockStore({ userInfo: [] })

    return store.dispatch(actions.requestLogIn(username, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates RECEIVED_AUTHENTICATION_ERROR when login with EMPTY CREDENTIALS', () => {
    let username = ''
    let password = ''

    let expectedActions = [
      {type: actions.REQUEST_AUTHENTICATION},
      {type: actions.RECEIVED_USER_ERROR, authErrorMessage: "You need to provide an email!"},
      {type: actions.RECEIVED_PASSWORD_ERROR, authErrorMessage: "You need to provide a password!"},
      {type: actions.STOP_LOADING}
    ]
    let store = mockStore({ userInfo: [] })

    store.dispatch(actions.requestLogIn(username, password))
	  expect(store.getActions()).toEqual(expectedActions)
  })

  it('creates RECEIVED_AUTHENTICATION_ERROR when login with EMPTY USERNAME', () => {
    let username = ''
    let password = 'correct_password'

    let expectedActions = [
      {type: actions.REQUEST_AUTHENTICATION},
      {type: actions.RECEIVED_USER_ERROR, authErrorMessage: "You need to provide an email!"},
      {type: actions.RECEIVED_PASSWORD_ERROR, authErrorMessage: " "},
      {type: actions.STOP_LOADING}
    ]
    let store = mockStore({ userInfo: [] })

    store.dispatch(actions.requestLogIn(username, password))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('creates RECEIVED_AUTHENTICATION_ERROR when login with EMPTY PASSWORD', () => {
    let username = 'correct_username'
    let password = ''

    let expectedActions = [
      {type: actions.REQUEST_AUTHENTICATION},
      {type: actions.RECEIVED_USER_ERROR, authErrorMessage: "You entered an invalid email!"},
      {type: actions.RECEIVED_PASSWORD_ERROR, authErrorMessage: "You need to provide a password!"},
      {type: actions.STOP_LOADING}
    ]
    let store = mockStore({ userInfo: [] })

    store.dispatch(actions.requestLogIn(username, password))
	  expect(store.getActions()).toEqual(expectedActions)
  })

  it('checkAuthCredentials saved', () => {
    let username = 'correct_username'
    let password = 'correct_password'
    let userDataString = {
        id: 12345678,
        username: "correct_username",
        email: "correct_email",
        user_id: 123123,
        country: "DE",
        blocked: false,
        metadata: "correct_metadata",
        source_system: "correct_source_system",
        roles: "correct_roles"
    }
    let userData = new userInfoEntities.UserData(userDataString)
    let userInfoString = {
      access_token: "access_token_str",
      expires_in: 10000,
      received_at: Date.now(),
      refresh_token: "refresh_token_str",
      token_type: "token_type_str",
      user_data: userData
    }

    let userInfo = new userInfoEntities.UserInfo(userInfoString)
    let expectedActions = [
      {type: actions.REQUEST_AUTHENTICATION},
      {type: actions.RECEIVED_AUTHENTICATION, userInfo: userInfo}
    ]

    let store = mockStore({ user: { userInfo: userInfo} })
    
    const delay = (ms) => new Promise(resolve =>
      setTimeout(resolve, ms)
    );
    
    return delay(10).then(() => {
      store.dispatch(actions.checkAuthCredentials())
    }).then(() => {
      return delay(10).then(() => {
        return expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  it('loadAuthCredentialsFromStorage nothing stored', () => {

    let userInfo = null

    let expectedActions = [
      {type: actions.REQUEST_AUTHENTICATION},
      {type: actions.RECEIVED_AUTHENTICATION_ERROR, authErrorMessage: ' '}
    ]

    let store = mockStore({ user: { userInfo: userInfo} })

    const delay = (ms) => new Promise(resolve =>
      setTimeout(resolve, ms)
    );
    
    return delay(10).then(() => {
      store.dispatch(actions.checkAuthCredentials())
    }).then(() => {
      return delay(10).then(() => {
        return expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  it('loadAuthCredentialsFromStorage need to refresh', () => {
    let username = 'correct_username'
    let password = 'correct_password'
    let userDataString = {
        id: 12345678,
        username: "correct_username",
        email: "correct_email",
        user_id: 123123,
        country: "DE",
        blocked: false,
        metadata: "correct_metadata",
        source_system: "correct_source_system",
        roles: "correct_roles"
    }
    let userData = new userInfoEntities.UserData(userDataString)
    let userInfoString = {
      access_token: "access_token_str",
      expires_in: 0,
      received_at: Date.now() - 10000000,
      refresh_token: "refresh_token_str",
      token_type: "token_type_str",
      user_data: userData
    }

    let userInfo = new userInfoEntities.UserInfo(userInfoString)

    let params = '?country=ML'
    fetchMock
      .postOnce(Res.Urls.LOGIN_URL + params,
        { body: userInfo, headers: { 'content-type': 'application/json' } }
      )
    let expectedActions = [
      { type: actions.REQUEST_AUTHENTICATION},
      { type: actions.RECEIVED_AUTHENTICATION, userInfo: userInfo }
    ]

    let store = mockStore({ user: { userInfo: userInfo} })

    const delay = (ms) => new Promise(resolve =>
      setTimeout(resolve, ms)
    );
    
    return delay(10).then(() => {
      store.dispatch(actions.checkAuthCredentials())
    }).then(() => {
      return delay(10).then(() => {
        return expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})
