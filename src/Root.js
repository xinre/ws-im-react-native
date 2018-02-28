// @flow

import React,{Component} from "react";
import { Provider } from "react-redux";
import {
    AppState,
} from "react-native";
import store from "./store";
import App from "./containers/App";
import {Toast} from "./utils/PublicFuncitonModule";
// import "./utils/APP_ROOT_CONFIG";
import {
    onChangeWebSocketConnectState,
    setWebSocket,
    removeMessageData,
} from "./actions/message"
import {
    userLogin
} from "./actions/user"
import {
    setGetNavigation
} from "./actions/app"
import {
    initSessionListData,
    addAllUserInfoData,
    addMoreAllUserInfoData,
    addMessageListViewData,
    addSessionListData,
    setUnreadMessageNum,
    selectedSessionListItem,
    setStickTopSessionListFunc,
} from "./actions/message/sessionList"
import {
    changeMessageItemData,
    addMessageItemData,
} from "./actions/message/messageSend"
import { NavigationActions } from 'react-navigation'
import {subscribe} from 'redux-subscriber';


const chatUrl = 'ws://ws.pinggai.cc'


export {
    MessageListView,
    MessageDetail,
} from "./containers/Navigator";



export const logOut = ()=>{
    const {
        dispatch
    } = store
    const {
        socketInstance
    } = store.getState().message
    if(socketInstance.readyState===1){
        socketInstance.close()
    }
    dispatch(removeMessageData())
    return new Promise((resolve, reject)=>{
        resolve({
            msg: '已清空数据'
        })
    })
}



export const setStickTopSessionList = (e)=>{
    if(Array.isArray(e)){
        const {
            dispatch
        } = store
        dispatch(setStickTopSessionListFunc(e))
        return new Promise((resolve, reject)=>{
            resolve()
        })
    }else {
        return new Promise((resolve, reject)=>{
            reject({
                errmsg: '传入参数类型异常'
            })
        })
    }
}




export const openMessageDetailViewController = ({id}:{id: number})=>{

    const {
        dispatch
    } = store

    const {
        socketInstance
    } = store.getState().message
    socketInstance.send(JSON.stringify({
        type: 'user.info',
        data: {
            user_id: id,
        }
    }))
    dispatch(selectedSessionListItem({
        id,
    }))

    const {
        getStore
    } = store.getState().navigation
    const externalStore = getStore()
    const navigateAction = NavigationActions.navigate({
        routeName: 'MessageDetail',
        params: {
            id
        },
    })
    externalStore.dispatch(navigateAction)
}


export const initializeSDKWithOptions = ({
    access_token,
    getNavigation,
    getStore,
    unreadMessageNumberChange,
}:{
    access_token: string,
    getNavigation: functon,
    getStore: functon,
    unreadMessageNumberChange: functon,
})=>{
    const {
        dispatch
    } = store

    const unsubscribe = subscribe('message.allUnreadMessage', state => {
        unreadMessageNumberChange&&unreadMessageNumberChange(state.message.allUnreadMessage)
    })

    dispatch(setGetNavigation({
        getNavigation,
        getStore,
    }))
    let ws: {
        socket: any,
        last_health_time: number,
        keepalive: () => mixed,
        receiveMessageTimer: (() => mixed) | number,
        keepAliveTimer: number,
        reconnectNumber: number,
    } = {
        socket: new WebSocket(`${chatUrl}`),
        last_health_time: -1,
        keepalive: ()=>{},
        receiveMessageTimer: ()=>{},
        keepAliveTimer: 0,
        reconnectNumber: 0,
    }
    ws.last_health_time = -1;
    ws.keepalive = ()=>{
        const time = new Date().getTime()
        if (ws.last_health_time !== -1 && time - ws.last_health_time > 20000) {
            ws.socket.close();
        } else {
            if (ws.socket.readyState === 1) {                          //react native中 WebSocket.bufferedAmount === void
                ws.socket.send(JSON.stringify({
                    type: 'pong'
                }))
                ws.last_health_time = time;
            }
        }
    }
    if (ws) {
        let reconnect = 0;
        let reconnectMark = false;

        ws.socket.onopen = () => {
            reconnect = 0;
            reconnectMark = false;
            ws.receiveMessageTimer = setTimeout(() => {
                ws.socket.close();
            }, 30000);
            if (ws.socket.readyState === 1) {
                ws.keepAliveTimer = setInterval(() => {
                    ws.keepalive();
                }, 1000);
            }

            dispatch(setWebSocket({
                socket:ws.socket
            }))

            dispatch(onChangeWebSocketConnectState({
                state : 1
            }))

            ws.socket.send(JSON.stringify({
                type: 'login',
                data: {
                    access_token,
                }
            }))

        };
        ws.socket.onerror = () => {
            dispatch(onChangeWebSocketConnectState({
                state : 3
            }))
            // Toast.error('WebSocket错误')
        };
        ws.socket.onmessage = (e) => {
            const data = JSON.parse(e.data)
            onMessage({ws: ws.socket,data,wsInstance:ws})

            clearTimeout(ws.receiveMessageTimer);
            ws.receiveMessageTimer = setTimeout(() => {
                ws.socket.close();
            }, 30000);
        };
        ws.socket.onclose = (e) => {
            if(e.code!==1001){

                dispatch(onChangeWebSocketConnectState({
                    state : 2
                }))

                clearTimeout(ws.receiveMessageTimer)
                clearInterval(ws.keepAliveTimer)
                if (!reconnectMark) {

                    reconnect = new Date().getTime();
                    reconnectMark = true;

                }
                const tempWs = ws;
                if (new Date().getTime() - reconnect >= 10000) {
                    ws.socket.close();
                } else {
                    if(AppState.currentState==='active'){
                        ws = {
                            socket: new WebSocket(`${chatUrl}`),
                            last_health_time: -1,
                            keepalive: tempWs.keepalive,
                            receiveMessageTimer: ()=>{},
                            keepAliveTimer: 0,
                        };
                        ws.socket.onopen = tempWs.socket.onopen;
                        ws.socket.onmessage = tempWs.socket.onmessage;
                        ws.socket.onerror = tempWs.socket.onerror;
                        ws.socket.onclose = tempWs.socket.onclose;
                        ws.reconnectNumber = tempWs.reconnectNumber+1;
                    }
                }
            }
            // Toast.error('WebSocket关闭')
        }
    }


    AppState.addEventListener('change', (e)=>{
        if(e==='active'&&ws.socket&&ws.socket.readyState===3){
            const tempWs = ws;
            ws = {
                socket: new WebSocket(`${chatUrl}`),
                last_health_time: -1,
                keepalive: tempWs.keepalive,
                receiveMessageTimer: ()=>{},
                keepAliveTimer: 0,
            };
            ws.socket.onopen = tempWs.socket.onopen;
            ws.socket.onmessage = tempWs.socket.onmessage;
            ws.socket.onerror = tempWs.socket.onerror;
            ws.socket.onclose = tempWs.socket.onclose;
            ws.reconnectNumber = tempWs.reconnectNumber+1;
        }
        if(e==='background'&&ws.socket&&ws.socket.readyState===1){
            ws.socket.close()
        }
    })

    return new Promise((resolve, reject)=>{
        resolve()
    })
}


const onMessage = ({ws,data,wsInstance})=>{
    const {
        allUserInfoData,
        allMessageListData,
    } = store.getState().message

    const {
        dispatch
    } = store

    switch (data.type) {
        case 'user.self':
            dispatch(userLogin({
                userInfoData: data.data.user_info
            }))
            break;
        case 'login':
            if(data.code===0){
                ws.send(JSON.stringify({
                    type: 'user.self',
                }))
                ws.send(JSON.stringify({
                    type: 'message.session.list',
                }))

                if(wsInstance.reconnectNumber!==0){
                    const {
                        allMessageListData,
                        sessionListData,
                    } = store.getState().message
                    let offlineMessage = []
                    sessionListData.map((e)=>{
                        const itemData = allMessageListData[e.relation_id]
                        if(itemData&&itemData.list.length){
                            offlineMessage.push({
                                id: e.relation_id,
                                last_message_id: itemData.list[0].id
                            })
                        }
                    })
                    offlineMessage.map((e)=>{
                        ws.send(JSON.stringify({
                            type: 'message.list',
                            data: {
                                type: 'user',
                    			relation_id: e.id,
                                last_message_id: e.last_message_id,
                            }
                        }))
                    })
                }

            }else {
                Toast.info(data.msg)
            }
            break;
        case 'message.session.list':
            const {
                session_list
            } = data.data

            // const {
            //     allMessageDataStore
            // } = store.getState().message
            // const newArray2 = session_list.filter((e)=>{
            //     return allMessageDataStore.find((data)=>{
            //         return data.id === e.id
            //     })
            // })
            //
            // console.log(newArray2);

            dispatch(initSessionListData({list:session_list}))
            let newArray = []
            session_list.map((item)=>{
                if(!allUserInfoData[item.relation_id]){
                    newArray.push(item.relation_id)
                }
            })
            if(newArray.length){
                ws.send(JSON.stringify({
                    type: 'user.infos',
                    data: {
                        user_ids: newArray,
                    }
                }))
            }
            break;
        case 'user.info':
            if(data.code===0){
                const {
                    user_info
                } = data.data
                dispatch(addAllUserInfoData({
                    id: user_info.id,
                    data: user_info
                }))
                const {
                    getNavigation,
                    getStore,
                } = store.getState().navigation
                const navigation = getNavigation()
                const externalStore = getStore()
                const {
                    index,
                    routes,
                } = navigation
                if(routes[index].routeName==='MessageDetail'){
                    const setParamsAction = NavigationActions.setParams({
                        params: { },
                        key: routes[index].key,
                    })
                    externalStore.dispatch(setParamsAction)
                }
            }else {
                Toast.info(data.msg)
            }
            break;
        case 'user.infos':
            if(data.code===0){
                const {
                    user_list
                } = data.data
                let newData = {}
                user_list.map((item)=>{
                    newData[item.id] = item
                })
                dispatch(addMoreAllUserInfoData({
                    data: newData
                }))
            }else {
                Toast.info(data.msg)
            }
            break;
        case 'message.list':

            if(data.code===0){
                const {
                    relation_id
                } = data.data
                const {
                    listViewInstance,
                } = store.getState().message

                dispatch(addMessageListViewData({
                    id: relation_id,
                    data: data.data
                }))
                .then(()=>{
                    if(data.data.page_data.current_page===1){
                        setTimeout(()=>{
                            listViewInstance&&listViewInstance(true)
                        },50)
                    }
                })

            }else {
                Toast.info(data.msg)
            }
            break;
        case 'message':

            if(data.code===0){
                const {
                    sign,
                    relation_id,
                    user_id,
                    create_time,
                } = data.data

                const {
                    allMessageListData,
                    sessionListData,
                    listViewInstance,
                    allUnreadMessage,
                    selectedSessionListItemId,
                } = store.getState().message
                const {
                    userInfo,
                } = store.getState().userIndex
                const {
                    getNavigation,
                } = store.getState().navigation
                const navigation = getNavigation()

                const kfUserId = selectedSessionListItemId
                const relationId = userInfo.id===relation_id?user_id:relation_id
                const myRelationId = userInfo.id!==relation_id?user_id:relation_id

                const sessionListIndex = sessionListData.findIndex((e)=>{return e.relation_id===relationId})

                //处理未读消息
                const isCurrentKf = kfUserId===relationId&&navigation.routes[navigation.routes.length-1].routeName==='MessageDetail'

                if(sessionListIndex !== -1){
                    //设置未读消息
                    if(!isCurrentKf){
                        if(allUnreadMessage[relationId]!==undefined){
                            const thisNum = allUnreadMessage[relationId]
                            dispatch(setUnreadMessageNum({
                                num: thisNum+1,
                                id: relationId,
                            }))
                        }else {
                            dispatch(setUnreadMessageNum({
                                num: 1,
                                id: relationId,
                            }))
                        }
                    }

                    //更改sessionListData排序
                    if(sessionListIndex!==0){
                        const thisSessionData = sessionListData[sessionListIndex]
                        sessionListData.splice(sessionListIndex,1)
                        const newData = [thisSessionData,...sessionListData]
                        dispatch(initSessionListData({list:newData}))
                    }


                    //添加消息处理
                    if(allMessageListData[relationId]){
                        const index = allMessageListData[relationId].list.findIndex((item)=>{
                            return item.sign===sign
                        })

                        if(index!==-1){
                            dispatch(changeMessageItemData({
                                id: relationId,
                                data: data.data,
                                index,
                                allMessageListData
                            }))
                        }else {
                            dispatch(addMessageItemData({
                                id: relationId,
                                data: data.data,
                                allMessageListData
                            }))
                        }

                        setTimeout(()=>{
                            listViewInstance&&listViewInstance()
                        },200)

                    }else {
                        //消息列表中没有这个客服的聊天记录，查询记录
                        ws.send(JSON.stringify({
                            type: 'message.list',
                            data: {
                                type: 'user',
                                relation_id:relationId,
                                page: 1,
                                rows: 10,
                            }
                        }))
                    }

                }else {
                    //设置未读消息
                    if(!isCurrentKf){
                        dispatch(setUnreadMessageNum({
                            num: 1,
                            id: relationId,
                        }))
                    }
                    //新的客服消息，添加客服信息
                    dispatch(addSessionListData({
                        list: sessionListData,
                        data: {
                            type: 'user',
                            relation_id:relationId,
                            last_time: create_time,
                        }
                    }))

                    ws.send(JSON.stringify({
                        type: 'user.info',
                        data: {
                            user_id: relationId,
                        }
                    }))
                }
            }else {
                Toast.info(data.msg)
            }
            break;
        default:
            return false
    }
}
