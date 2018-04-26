import PropTypes from 'prop-types'

const XDate = require('xdate');

export const DeliveryPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  deliveryDate: PropTypes.instanceOf(Date).isRequired,
  cutoffDate: PropTypes.instanceOf(Date).isRequired,
  status: PropTypes.string.isRequired,
  subscriptionId: PropTypes.string.isRequired
});

export function Delivery(json) {
  this.id = json.id;
  this.deliveryDate = new XDate(json.deliveryDate.toString()).toDate();
  this.cutoffDate = new XDate(json.cutoffDate.toString()).toDate();
  this.status = json.status;
  this.subscriptionId = json.subscriptionId;
  return this;
}
