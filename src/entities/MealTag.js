import PropTypes from 'prop-types'

export function MealTag(name, color) {
  this.name = name;
  this.color = color;
}

export const MealTagPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
});
