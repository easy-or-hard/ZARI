import { combineReducers } from "redux";
import { backgroundReducer } from "./backgroundReducer";
import { modalContentsReducer, modalHandlerReducer } from "./modalReducer";

export const rootReducer = combineReducers({
  backgroundGd: backgroundReducer,
  modalHandlerReducer: modalHandlerReducer,
  modalContentsReducer: modalContentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
