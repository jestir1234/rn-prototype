import { combineReducers } from "redux";
import { MealAction } from "../actions";
import { Meal } from "../entities/Meal.js";
import { MealTag } from "../entities/MealTag.js";
import { Price } from "../entities/Price.js";

let initState = { data: [], loading: false };

const mealsReducer = (state = initState, action) => {
  console.log("The action is...", action);
  let newState;
  switch (action.type) {
    case MealAction.LOAD_MEALS:
      console.log("LOADING MENUS....");
      newState = Object.assign({}, state, {
        loading: true
      });
      return newState;
    case MealAction.RECEIVE_MENU:
      console.log("RECEIVING MENUS....");
      newState = Object.assign({}, state, {
        data: action.payload,
        loading: false
      });
      return newState;
    default:
      return state;
  }
};

let newMeal = () => {
  var tags = [new MealTag("Spicy", "#996633"), new MealTag("Vegan", "#3fb2a0")];
  return new Meal(
    "123",
    "King Prawn Miso Ramen",
    "https://everdine-eu-west-1-live01-public.s3-eu-west-1.amazonaws.com/gb-live/thumbnail_300x260_PrawnMisoRamen_391.jpg",
    "This hot bowl of Japanese broth comes with a good serving of comfort. Soba noodles add phytonutrients which are beneficial to your health in plentiful ways. Miso  boosts your vitamin B12, B2 and E levels and contains numerous good enzymes!",
    new Price(4.5, "GBP"),
    tags
  );
};

/*const rootReducer = combineReducers({
  dataReducer
})*/

export default mealsReducer;
