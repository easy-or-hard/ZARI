import {
  BackgroundAction,
  BACKGROUND_GD_TYPE_GREEN,
  BACKGROUND_GD_TYPE_ORANGE,
  BACKGROUND_GD_TYPE_PASTEL,
  BACKGROUND_GD_TYPE_PUPPLE,
} from "../actions/backgroundGd";


export const backgroundReducer = (state:string = "green", action: BackgroundAction) => {
  switch (action.type) {
    case BACKGROUND_GD_TYPE_GREEN:
      return (state = "green");
    case BACKGROUND_GD_TYPE_ORANGE:
      return (state = "orange");
    case BACKGROUND_GD_TYPE_PASTEL:
      return (state = "pastel");
    case BACKGROUND_GD_TYPE_PUPPLE:
      return (state = "pupple");
    default:
      return state;
  }
};