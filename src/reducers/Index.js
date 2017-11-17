"use strict";
import { combineReducers } from "redux";
import userIndex from "./user/index";
import appInitial from "./app";
import message from "./message";
import navigation from "./navigation";


const rootReducer = combineReducers({
    message,
    userIndex,
    appInitial,
    navigation
});

export default rootReducer;
