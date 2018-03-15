//@flow

import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    FlatList,
} from 'react-native';

import {PublicStyles,PublicStylesString,windowWidth,windowHeight,ThemeStyle} from '../utils/PublicStyleModule';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import { HeaderBackButton } from "react-navigation";
import MessageSessionListRow from "../components/MessageSessionListRow";
import {
    sessionListRefresh
} from "../actions/message/sessionList";
import { NavigationActions } from 'react-navigation'



class MessageListView extends Component{
    render() {
        const {
            sessionListData,
            allUserInfoData,
            allUnreadMessage,
            socketInstance,
            dispatch,
            sessionListRefreshing,
            navigation,
            allMessageListData,
            screenProps,
            listViewHeader,
            stickTopSessionList,
        } = this.props

        const sessionList = stickTopSessionList.length
        ?   sessionListData.sort((a,b)=>{
                const index = stickTopSessionList.findIndex((e)=>(e===a.relation_id))
                const index2 = stickTopSessionList.findIndex((e)=>(e===b.relation_id))
                return index2 - index
            })
        :   sessionListData

        return (
            <View style={{flex:1}}>
                <FlatList
                    ListHeaderComponent = {listViewHeader||undefined}
                    data={sessionList}
                    renderItem={({item}) => (
                        <MessageSessionListRow
                            itemData = {item}
                            allUserInfoData = {allUserInfoData}
                            allUnreadMessage = {allUnreadMessage}
                            navigation = {navigation}
                            dispatch = {dispatch}
                            allMessageListData = {allMessageListData}
                        />
                    )}
                    keyExtractor={(item)=>item.relation_id}
                    ItemSeparatorComponent = {separatorComponent}
                    style = {{backgroundColor:'#F0EFF5'}}
                    refreshing = {sessionListRefreshing}
                    onRefresh = {()=>{
                        if(socketInstance&&socketInstance.readyState===1){
                            dispatch(sessionListRefresh())
                            socketInstance.send(JSON.stringify({
                                type: 'message.session.list',
                            }))
                        }
                    }}
                />
            </View>
        )
    }
}

const separatorComponent = ()=>{
    return(
        <View style={styles.view1}>
            <View style={styles.view2}/>
        </View>
    )
}

const styles = StyleSheet.create({
    view1:{
        backgroundColor:'#fff',
    },
    view2:{
        borderBottomWidth:1,
        borderColor:'#F2F2F2',
        marginLeft:10,
    },
})


const mapStateToProps = store => {
    const {
        sessionListData,
        connectState,
        allUserInfoData,
        allUnreadMessage,
        socketInstance,
        sessionListRefreshing,
        allMessageListData,
        stickTopSessionList,
    } = store.message
    return {
        connectState,
        sessionListData,
        allUserInfoData,
        allUnreadMessage,
        socketInstance,
        sessionListRefreshing,
        allMessageListData,
        stickTopSessionList,
    };
};

export default connect(mapStateToProps)(MessageListView);
