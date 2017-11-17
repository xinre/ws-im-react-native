'use strict';

import types from '../../constants/ActionTypes';
import fetchStatus from '../../utils/fetchStatus';

const initialState = {
    faqData : [],
    faqDataFetchStatus : fetchStatus.l
}

export default function userIndex(state = initialState, action) {
    switch (action.type) {
        case types.user.GET_FAQ_DATA:
            return Object.assign({}, state, {
                faqData: action.data,
                faqDataFetchStatus : action.faqDataFetchStatus
            })
        default:
            return state;
    }
}
