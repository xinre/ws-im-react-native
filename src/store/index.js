'use strict';

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/Index'
import initSubscriber from 'redux-subscriber';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const initialState = {

}

const store = createStoreWithMiddleware(rootReducer, initialState)

const subscribe = initSubscriber(store);

export default store
