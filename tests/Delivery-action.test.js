import * as actions from '../src/actions/delivery'
import * as userActions from '../src/actions/user'
import { Urls } from '../src/res'
import { Delivery, DeliveryPropType } from '../src/entities'
import * as NetworkManager from '../src/network/api.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import expect from 'expect'
import deliveriesDataJson from './mockData/deliveries.json'
import * as utils from './utils/entities'

import * as Res from '../src/res'

const middlewares = [thunk.withExtraArgument(NetworkManager)]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  beforeEach(() => {
    moxios.install(NetworkManager.axiosInstance)
  })
  afterEach(() => {
    moxios.uninstall(NetworkManager.axiosInstance)
  })

  it('sets state RECEIVED_DELIVERIES, if correct weeks are sent', () => {
    let firstWeek = '2018-W17'
    let lastWeek = '2018-W23'

    let params = '?country=' + Res.Configs.COUNTRY + '&locale=' + Res.Configs.LOCALE + '&rangeStart=' + firstWeek + '&rangeEnd=' + lastWeek;
   
    moxios
      .stubRequest(Res.Urls.DELIVERIES_URL + params,
        { status: 200, response: deliveriesDataJson, headers: { 'content-type': 'application/json' } }
      )
	  
    let deliveries = deliveriesDataJson.items.map(item => {
      return new Delivery(item)	  
    })
	
    let expectedActions = [
	  {"type": "REQUEST_DELIVERIES"},
      {"type": "RECEIVED_DELIVERIES", "deliveries": deliveries}
    ]

    let userInfo = utils.createUserInfoMock()
    let store = mockStore({ user: { userInfo: userInfo }})
    NetworkManager.setStore(store)

    return store.dispatch(actions.loadDeliveries(firstWeek, lastWeek)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  
  
  it('sets state RECEIVED_DELIVERIES_ERROR, if server doesn not reply with HTTP Status Code 200', () => {
    let firstWeek = '2018-W17'
    let lastWeek = '2018-W23'
    
        let params = '?country=' + Res.Configs.COUNTRY + '&locale=' + Res.Configs.LOCALE + '&rangeStart=' + firstWeek + '&rangeEnd=' + lastWeek;
     
    moxios
      .stubRequest(Res.Urls.DELIVERIES_URL + params,
        { response: '', status: 500, headers: { 'content-type': 'application/json' } }
      )
	  	
    let expectedActions = [
	  {"type": "REQUEST_DELIVERIES"},
	  {"type": "RECEIVED_DELIVERIES_ERROR", "error": expect.stringMatching(/\\*/)},
    ]

    let userInfo = utils.createUserInfoMock()
    let store = mockStore({ user: { userInfo: [] }})
    NetworkManager.setStore(store)

    return store.dispatch(actions.loadDeliveries(firstWeek, lastWeek)).then(() => {
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })  
  

})
