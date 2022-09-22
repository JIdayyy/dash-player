import { combineReducers } from "redux";

import player from "@redux/slices/player";
import user from "@redux/slices/user";

import { store } from "./store";

const rootReducer = combineReducers({ player, user });

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
