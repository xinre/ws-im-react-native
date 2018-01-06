import types from '../constants/ActionTypes';

const initialState = {
    getNavigation : null,
    getStore: null,
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case types.app.SET_GET_NAVIGATION:
            return Object.assign({}, state, {
                getNavigation: action.getNavigation,
                getStore: action.getStore,
            })
        default:
            return state;
    }
}
