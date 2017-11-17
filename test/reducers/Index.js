'use strict';
import {combineReducers} from 'redux';
import userIndex from './user/index';
import appInitial from './app';



const rootReducer = combineReducers({
    userIndex,
    appInitial,
});

export default rootReducer;
