import types from '../../constants/ActionTypes';



export const onChangeWebSocketConnectState = ({state})=>{
    return dispatch => {
        dispatch({
            type : types.message.ONCHANGE_WEBSOCKET_CONNECT_STATE,
            connectState : state,
        })
    }
}


export const setWebSocket = ({socket})=>{
    return dispatch => {
        dispatch({
            type : types.message.SET_WEBSOCKET,
            socket
        })
    }
}



export const showConnectLoading = (e)=>{
    return dispatch => {
        dispatch({
            type : types.message.SHOW_CONNECT_LOADING,
            show : e
        })
    }
}



export const setListViewInstance = (e)=>{
    return dispatch => {
        dispatch({
            type : types.message.SET_LISTVIEW_INSTANCE,
            listViewInstance: e
        })
    }
}



export const refreshingChange = (e)=>{
    return dispatch => {
        dispatch({
            type : types.message.REFRESHING_CHANGE,
            refreshing: e
        })
    }
}


export const removeMessageData = ()=>{
    return dispatch => {
        dispatch({
            type : types.message.REMOVE_MESSAGE_DATA,
        })
    }
}
