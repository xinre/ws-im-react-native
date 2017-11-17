'use strict';
import types from '../../constants/ActionTypes';

const initialState = {
    showBootPage : false,
    showFetchLoading : false,
    goodsRecommendlist: null,
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case types.app.UPDATE_FIRST_OPEN:
            return Object.assign({}, state, {
                showBootPage: action.data,
            })
        case types.app.UPDATE_FETCH_LOADING:
            return Object.assign({}, state, {
                showFetchLoading: action.data,
            })
        case types.app.GET_GOODS_RECOMMEND_LIST:
            return Object.assign({}, state, {
                goodsRecommendlist: action.data
            })
        default:
            return state;
    }
}
