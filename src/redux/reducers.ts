import { combineReducers } from "redux";
import player from "@redux/slices/player";
import user from "@redux/slices/user";
import manage from "@redux/slices/manage";

import { store } from "./store";

const rootReducer = combineReducers({ player, user, manage });

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
