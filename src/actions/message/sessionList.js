import types from '../../constants/ActionTypes';
// import {Fetch,fetchStatus} from '../../utils';
import store from '../../store';



export const initSessionListData = ({list})=>{
    return dispatch => {
        dispatch({
            type : types.message.INIT_SESSION_LIST_DATA,
            list,
        })
    }
}



export const addSessionListData = ({data,list})=>{
    return dispatch => {

        const newList = [data,...list]
        dispatch({
            type : types.message.INIT_SESSION_LIST_DATA,
            list:newList,
        })
    }
}



export const addAllUserInfoData = ({data,id})=>{
    return dispatch => {
        let newData = {}
        newData[id] = data
        dispatch({
            type : types.message.ADD_ALL_USER_INFO_DATA,
            data: newData
        })
    }
}


export const addMoreAllUserInfoData = ({data})=>{
    return dispatch => {
        dispatch({
            type : types.message.ADD_ALL_USER_INFO_DATA,
            data,
        })
    }
}



export const selectedSessionListItem = ({id})=>{
    return dispatch => {
        let newObject = {}
        newObject[id] = 0
        dispatch({
            type : types.message.SELECTED_SESSION_LIST_ITEM,
            id,
            unreadMessageData: newObject,
        })
        store.getState().message.socketInstance.send(JSON.stringify({
            type: 'message.list',
            data: {
                type: 'user',
    			relation_id: id,
                page: 1,
                rows: 10,
            }
        }))
    }
}



export const addMessageListViewData = ({data,id})=>{
    return dispatch => {
        return new Promise((resolve, reject)=>{
            resolve()
        })
        .then(()=>{
            const {
                message
            } = store.getState()

            const {
                allMessageListData,
            } = message

            if(allMessageListData[id]){
                const oldData = allMessageListData[id].list
                let newData = {}

                if(data.page_data.current_page===1){

                }else {
                    data.list = [...oldData,...data.list]
                }

                newData[id] = data
                dispatch({
                    type : types.message.ADD_MESSAGE_LIST_VIEW_DATA,
                    data: newData,
                    refreshing: false
                })
            }else {
                let newData = {}
                newData[id] = data
                dispatch({
                    type : types.message.ADD_MESSAGE_LIST_VIEW_DATA,
                    data: newData,
                    refreshing: false
                })
            }
        })
    }
}


export const setUnreadMessageNum = ({num,id})=>{
    return dispatch => {
        let newData = {}
        newData[id] = num
        dispatch({
            type: types.message.SET_UNREAD_MESSAGE_NUM,
            data: newData,
        })
    }
}


export const sessionListRefresh = ()=>{
    return dispatch => {
        dispatch({
            type : types.message.SESSION_LIST_REFRESH,
        })
    }
}


export const setStickTopSessionListFunc = (e)=>{
    return dispatch => {
        dispatch({
            type: types.message.SET_STICK_TOP_SESSION_LIST,
            data: e,
        })
    }
}
