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
        const {
            socketInstance
        } = store.getState().message
        let newObject = {}
        if(newObject[id]!==0){
            newObject[id] = 0
            dispatch({
                type: types.message.SELECTED_SESSION_LIST_ITEM,
                id,
                unreadMessageData: newObject,
            })
            socketInstance.send(JSON.stringify({
                type: 'message.read',
                data: {
        			user_id: id,
                }
            }))
        }
        socketInstance.send(JSON.stringify({
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

                if(data.page_data.current_page!==1){
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



export const addBatchMessageListViewData = ({list})=>{
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

            list.map((item)=>{
                const id = item.relation_id
                const data = item
                if(allMessageListData[id]){
                    const oldData = allMessageListData[id].list

                    if(data.page_data.current_page!==1){
                        data.list = [...oldData,...data.list]
                    }

                    allMessageListData[id] = data

                }else {
                    allMessageListData[id] = data
                }
            })

            // console.log(allMessageListData);
            dispatch({
                type : types.message.ADD_BATCH_MESSAGE_LIST_VIEW_DATA,
                data: allMessageListData,
                refreshing: false
            })

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


export const setUnreadMessageNumData = (e)=>{
    return dispatch => {
        dispatch({
            type: types.message.SET_UNREAD_MESSAGE_NUM,
            data: e,
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
