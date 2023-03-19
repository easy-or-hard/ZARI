import { combineReducers } from "redux";
import { backgroundReducer } from "./backgroundReducer";


export const rootReducer = combineReducers({
    backgroundGd : backgroundReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

