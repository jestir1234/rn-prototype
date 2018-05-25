import { Delivery, DeliveryPropType, DeliveryStatus } from '../entities'
import { Urls } from '../res'
import XDate from 'xdate'

/*
*  Action constants
*/
export const REQUEST_DELIVERIES = "REQUEST_DELIVERIES"
export const RECEIVED_DELIVERIES = "RECEIVED_DELIVERIES"
export const RECEIVED_DELIVERIES_ERROR = "RECEIVED_DELIVERIES_ERROR"
export const REQUEST_EDIT_DELIVERY = "REQUEST_EDIT_DELIVERY"
export const RECEIVED_EDIT_DELIVERY = "RECEIVED_EDIT_DELIVERY"
export const RECEIVED_EDIT_DELIVERY_ERROR = "RECEIVED_EDIT_DELIVERY_ERROR"

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
    error
  }
}

function createRequestEditDelivery() {
  return {
    type: REQUEST_EDIT_DELIVERY
  }
}

function createReceivedEditDelivery(delivery) {
  return {
    type: RECEIVED_EDIT_DELIVERY,
    delivery
  }
}

function createReceivedEditDeliveryError(error) {
  return {
    type: RECEIVED_EDIT_DELIVERY_ERROR,
    error
  }
}

/*
* Action triggers
*/
export function loadDeliveries(firstWeek, lastWeek) {
  return (dispatch, getState, NetworkManager) => {
    dispatch(createRequestDeliveries())

    let params = {
      'rangeStart': firstWeek,
      'rangeEnd': lastWeek
    };
    return NetworkManager.doGet(Urls.DELIVERIES_URL, params)
      .then(json => {
        let deliveries = json.items.map(item => {
          return new Delivery(item)
        });
        dispatch(createReceivedDeliveries(deliveries));
      })
      .catch(error => dispatch(createReceivedDeliveriesError(error.message)))
  }
}

function editDelivery(delivery, edit) {
  return (dispatch, getState, NetworkManager) => {
    dispatch(createRequestEditDelivery())

    let accessToken = getState().user.userInfo.access_token;
    let editUrl = Urls.SKIP_DELIVERY_URL
      .replace('${subscription_id}', delivery.subscriptionId)
      .replace('${delivery_id}', delivery.id);
    let getUrl = Urls.GET_DELIVERY_URL
      .replace('${subscription_id}', delivery.subscriptionId)
      .replace('${delivery_id}', delivery.id);
    return NetworkManager.doPatch(editUrl, edit, {})
    .then(response => NetworkManager.doGet(getUrl, {}))
    .then(json => {
      let newDelivery = new Delivery(json)
      newDelivery.subscriptionId = delivery.subscriptionId //FIX: should be removed if they fix the backend!
      dispatch(createReceivedEditDelivery(newDelivery))
      return newDelivery
    })
    .catch(error => dispatch(createReceivedEditDeliveryError(error)))
  }
}

export function skipDelivery(delivery) {
  let editObj = {
    "delivery": {
      "status": DeliveryStatus.PAUSED,
      "deliveryDate": new XDate(delivery.deliveryDate).toString('u')
    }
  };
  return editDelivery(delivery, editObj);
}

export function unskipDelivery(delivery) {
  let editObj = {
    "delivery": {
      "status": DeliveryStatus.RUNNING,
      "deliveryDate": new XDate(delivery.deliveryDate).toString('u')
    }
  };
  return editDelivery(delivery, editObj);
}
