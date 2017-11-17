'use strict';

import types from '../../constants/ActionTypes';

const initialState = {
    login : false,
    userInfo : null,
    couponNum : 0,
    refreshing : false,
    orderNum : {
        noPayNum : 0,
        noSendNum : 0,
        noReceivingNum : 0,
        noEvalNum : 0,
        refundNum : 0,
    },
    unReadMessageCount : 0,
}

export default (state = initialState, action)=> {
    switch (action.type) {
        case types.user.USER_STATUS_CHANGE:
            return Object.assign({}, state, {
                login: action.login,
                userInfo: action.userInfo,
            })
        case types.user.UPDATE_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.userInfo,
                refreshing: action.refreshing,
            })
        case types.user.GET_USER_MIXEDSTATENUM_DATA:
            return Object.assign({}, state, {
                couponNum: action.couponNum,
                orderNum : action.orderNum,
            })
        case types.user.UPDATE_USER_INFO_LOADING:
            return Object.assign({}, state, {
                refreshing: action.refreshing,
            })
        case types.user.GET_UNREAD_ALL_COUNT:
            return Object.assign({}, state, {
                unReadMessageCount: action.data,
            })
        default:
            return state;
    }
}
