import { Urls } from "../res";
import { Recipe } from "../entities/Meal";
/*
* Action constants
*/
export const LOAD_MEALS = "LOAD_MEALS";
export const RECEIVE_MENU = "RECEIVE_MENU";
export const RECEIVE_MENU_ERROR = "RECEIVE_MENU_ERROR";

/*
* Action creators
*/
export function newActionLoadMeals() {
  return { type: LOAD_MEALS };
}

export function createReceiveMenu(menu) {
  return {
    type: RECEIVE_MENU,
    payload: menu
  };
}

export function createReceiveMenuError() {
  return {
    type: RECEIVE_MENU_ERROR
  };
}

export function fetchMenus(week) {
  return (dispatch, getState, NetworkManager) => {
    dispatch(newActionLoadMeals());
    const params = {
      week: week,
      country: "ML",
      locale: "en-US"
    };
    return NetworkManager.doGet(Urls.MENU_URL, params)
      .then(json => {
        let menu = json.items[0].courses.map(item => {
          const { id, name, imageLink, headline } = item.recipe;
          console.log(Recipe);
          return new Recipe(id, name, imageLink, headline);
        });

        dispatch(createReceiveMenu(menu));
      })
      .catch(error => dispatch(createReceiveMenuError()));
  };
}
