import 'cross-fetch/polyfill'
import { Delivery, DeliveryPropType } from '../entities'
import { Urls } from '../res'

/*
*  Action constants
*/
export const REQUEST_DELIVERIES = "REQUEST_DELIVERIES"
export const RECEIVED_DELIVERIES = "RECEIVED_DELIVERIES"
export const RECEIVED_DELIVERIES_ERROR = "RECEIVED_DELIVERIES_ERROR"

/*
* Action creators
*/
function createRequestDeliveries() {
  return {
    type: REQUEST_DELIVERIES
  }
}

function createReceivedDeliveries(deliveries) {
  return {
    type: RECEIVED_DELIVERIES,
    deliveries: deliveries
  }
}

function createReceivedDeliveriesError(error) {
  return {
    type: RECEIVED_DELIVERIES_ERROR,
    error: error
  }
}

/*
* Action triggers
*/
export function loadDeliveries(firstWeek, lastWeek) {
  return (dispatch, getState) => {
    dispatch(createRequestDeliveries())

    let accessToken = getState().user.userInfo.access_token;
    let params = `?rangeStart=${firstWeek}&rangeEnd=${lastWeek}&country=ML&locale=en-US`;
    return fetch(Urls.DELIVERIES_URL + params, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {
		console.log("Response code: ", response.status)
      if(response.status >= 200 && response.status < 300) {
        return response
      } else {
        console.log('Error getting deliveries! status:' + response.status);
        throw response.statusText
      }
    })
    .then(response => response.json())
    .then(json => {
      let deliveries = json.items.map(item => {
        return new Delivery(item)
      });
      dispatch(createReceivedDeliveries(deliveries));
    })
    .catch(error => dispatch(createReceivedDeliveriesError(error)))
  }
}
