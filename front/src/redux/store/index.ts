import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "../reducers/rootReducer";
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: "root",
  storage: storage,
};

// export const store = createStore(rootReducer);
export const store = createStore(persistReducer(persistConfig, rootReducer));
