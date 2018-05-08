import { BASE_URL } from './configs.js'

export const LOGIN_URL = BASE_URL + "/login"
export const DELIVERIES_URL = BASE_URL + "/api/customers/me/deliveries"
export const SKIP_DELIVERY_URL = BASE_URL + "/api/subscriptions/${subscription_id}/delivery_dates/${delivery_id}"
export const GET_DELIVERY_URL = BASE_URL + "/api/subscriptions/${subscription_id}/delivery_dates/${delivery_id}"
