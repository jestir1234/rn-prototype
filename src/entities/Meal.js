import PropTypes from "prop-types";
import { Price, PricePropType } from "./Price.js";
import { MealTag, MealTagPropType } from "./MealTag.js";

export function Meal(id, title, image, description, price, tags) {
  this.id = id;
  this.title = title;
  this.image = image;
  this.description = description;
  this.price = price;
  this.tags = tags;
}

export const MealPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.objectOf(PricePropType).isRequired,
  tags: PropTypes.arrayOf(MealTagPropType)
});

export function Recipe(id, name, imageLink, headline) {
  this.id = id;
  this.name = name;
  this.imageLink = imageLink;
  this.headline = headline;
}
