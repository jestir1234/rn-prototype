import { DeliveryAction } from '../actions'

let initState = {
  isLoading: false,
  deliveries: []
};

const deliveryReducer = (state = initState, action) => {
  switch(action.type) {
    case DeliveryAction.REQUEST_DELIVERIES:
      return Object.assign({}, state, { isLoading: true });
    case DeliveryAction.RECEIVED_DELIVERIES:
      return Object.assign({}, state, {
        isLoading: false,
        deliveries: action.deliveries
      });
    case DeliveryAction.RECEIVED_DELIVERIES_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    case DeliveryAction.REQUEST_EDIT_DELIVERY:
      return Object.assign({}, state, { isLoading: true });
    case DeliveryAction.RECEIVED_EDIT_DELIVERY:
      return Object.assign({}, state, {
        isLoading: false,
        deliveries: replaceDelivery(state.deliveries, action.delivery)
      });
    case DeliveryAction.RECEIVED_EDIT_DELIVERY_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        editError: action.error
      });
    default:
      return state;
  }
};

const replaceDelivery = (deliveries, newDelivery) => {
  let newDeliveries = deliveries.slice();
  let index = newDeliveries.findIndex(item => item.id === newDelivery.id);
  if(index >= 0) {
    newDeliveries.splice(index, 1, newDelivery);
  }
  return newDeliveries;
};

export default deliveryReducer;
