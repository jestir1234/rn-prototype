import * as actions from '../src/actions/user'
import * as userInfoEntities from '../src/entities/UserInfo'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates RECEIVED_AUTHENTICATION when login with correct credentials', () => {
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
      {"type": "REQUEST_AUTHENTICATION"},
      { type: actions.RECEIVED_AUTHENTICATION, userInfo: userInfo }
    ]
    let store = mockStore({ userInfo: [] })

    console.log("BEFORE actions.requestLogIn(")
    return store.dispatch(actions.requestLogIn(username, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  
  it('creates RECEIVED_AUTHENTICATION_ERROR when login with EMPTY CREDENTIALS', () => {
    let username = ''
    let password = ''

    let expectedActions = [
      {"type": "REQUEST_AUTHENTICATION"},
      { type: actions.RECEIVED_AUTHENTICATION_ERROR, authenticationErrorType: actions.AuthenticationErrorType.AUTHENTICATION_ERROR_USER_PASSWORD_EMPTY}
    ]
    let store = mockStore({ userInfo: [] })

    console.log("BEFORE actions.requestLogIn(")
	store.dispatch(actions.requestLogIn(username, password))
	expect(store.getActions()).toEqual(expectedActions)
  })
  
   it('creates RECEIVED_AUTHENTICATION_ERROR when login with EMPTY USERNAME', () => {
    let username = ''
    let password = 'correct_password'

    let expectedActions = [
      {"type": "REQUEST_AUTHENTICATION"},
      { type: actions.RECEIVED_AUTHENTICATION_ERROR, authenticationErrorType: actions.AuthenticationErrorType.AUTHENTICATION_ERROR_USER_EMPTY}
    ]
    let store = mockStore({ userInfo: [] })

    console.log("BEFORE actions.requestLogIn(")
	store.dispatch(actions.requestLogIn(username, password))
	expect(store.getActions()).toEqual(expectedActions)
  })
  
  it('creates RECEIVED_AUTHENTICATION_ERROR when login with EMPTY PASSWORD', () => {
    let username = 'correct_username'
    let password = ''

    let expectedActions = [
      {"type": "REQUEST_AUTHENTICATION"},
      { type: actions.RECEIVED_AUTHENTICATION_ERROR, authenticationErrorType: actions.AuthenticationErrorType.AUTHENTICATION_ERROR_PASSWORD_EMPTY}
    ]
    let store = mockStore({ userInfo: [] })

    console.log("BEFORE actions.requestLogIn(")
	store.dispatch(actions.requestLogIn(username, password))
	expect(store.getActions()).toEqual(expectedActions)
  })
})
