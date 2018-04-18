import PropTypes from 'prop-types'

export function Price(amount, currency) {
  this.amount = amount;
  this.currency = currency;
}

export const PricePropType = PropTypes.shape({
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired
});