import {
  BACKGROUND_CHANGE,
  BackgroundAction,
} from "../actions/backgroundAction";

export const backgroundReducer = (
  state: string = "default",
  action: BackgroundAction
) => {
  switch (action.type) {
    case BACKGROUND_CHANGE:
      return (state = action.payload);
    default:
      return state;
  }
};
