'use strict';

import types from '../../constants/ActionTypes';
import fetchStatus from '../../utils/fetchStatus';

const initialState = {
    data : null,
    fetchStatus : fetchStatus.l
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case types.user.GET_USER_MESSAGE_DATA:
            return Object.assign({}, state, {
                data: action.data,
                fetchStatus : action.fetchStatus
            })
        default:
            return state;
    }
}
