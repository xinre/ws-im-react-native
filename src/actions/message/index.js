import types from '../../constants/ActionTypes';
import{
    AsyncStorage
} from 'react-native';
import{
    removeSessionStorageKey
} from '../../Root';


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


export const removeSession = (id,oldArray)=>{
    return dispatch => {
        const e = `${id}`
        const newArray = [...oldArray]
        if(!newArray.includes(e)){
            newArray.push(e)
            AsyncStorage.setItem(removeSessionStorageKey,JSON.stringify(newArray))
            dispatch({
                type: types.message.REMOVE_SESSION,
                data: newArray
            })
        }
    }
}


export const initRemoveSession = ()=>{
    return dispatch => {
        AsyncStorage.getItem(removeSessionStorageKey)
        .then((e)=>{
            if(e){
                const newArray = JSON.parse(e)
                dispatch({
                    type: types.message.REMOVE_SESSION,
                    data: newArray
                })
            }
        })
    }
}



export const checkIsRemoveSession = (id,oldArray)=>{
    return dispatch => {
        const e = `${id}`
        const index = oldArray.findIndex(item=>item===e)
        if(index!==-1){
            const newArray = [...oldArray]
            newArray.splice(index,1)
            AsyncStorage.setItem(removeSessionStorageKey,JSON.stringify(newArray))
            dispatch({
                type: types.message.REMOVE_SESSION,
                data: newArray
            })
        }
    }
}
