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
    default:
      return state;
  }
};

export default deliveryReducer;
