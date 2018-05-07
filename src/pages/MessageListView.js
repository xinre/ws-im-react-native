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
    SwipeableFlatList,
    TouchableHighlight,
    Alert,
} from 'react-native';

import {PublicStyles,PublicStylesString,windowWidth,windowHeight,ThemeStyle} from '../utils/PublicStyleModule';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import { HeaderBackButton } from "react-navigation";
import MessageSessionListRow from "../components/MessageSessionListRow";
import {
    sessionListRefresh,
    selectedSessionListItem,
} from "../actions/message/sessionList";
import { NavigationActions } from 'react-navigation'
import MessageSearch from "../components/MessageSearch";
import {removeSession} from "../actions/message";



class MessageListView extends Component{
    state={
        searchModalVisible: false,
    }
    changeSearchModal = (e)=>{
        this.setState({
            searchModalVisible: e
        })
    }
    render() {
        const {
            searchModalVisible,
        } = this.state
        const {
            sessionListData: nativeSessionListData,
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
            removeSessionList,
        } = this.props
        const sessionListData = nativeSessionListData.filter((e)=>!removeSessionList.includes(`${e.relation_id}`))
        const sessionList = stickTopSessionList.length
        ?   sessionListData.sort((a,b)=>{
                const index = stickTopSessionList.findIndex((e)=>(e===a.relation_id))
                const index2 = stickTopSessionList.findIndex((e)=>(e===b.relation_id))
                return index2 - index
            })
        :   sessionListData
        const sessionListDataSource = sessionList.map((item)=>{
            return allUserInfoData[item.relation_id]
        })
        return (
            <View style={{flex:1}}>
                <SwipeableFlatList
                    renderQuickActions={this.renderQuickActions}
                    bounceFirstRowOnMount={false}
                    maxSwipeDistance={80}
                    ListHeaderComponent = {
                        <View>
                            {listViewHeader}
                            <TouchableOpacity
                                style={styles.view3}
                                activeOpacity={1}
                                onPress={()=>{
                                    this.changeSearchModal(true)
                                }}
                            >
                                <Image
                                    source={require('../images/search.png')}
                                    style={styles.image1}
                                />
                                <Text style={styles.text1}>
                                    搜索
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
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
                    keyExtractor={(item)=>`${item.relation_id}`}
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
                <MessageSearch
                    visible={searchModalVisible}
                    close={()=>{
                        this.changeSearchModal(false)
                    }}
                    dataSource={sessionListDataSource}
                    sessionData={sessionList}
                    allUserInfoData={allUserInfoData}
                    navigation={navigation}
                    dispatch={dispatch}
                    allMessageListData={allMessageListData}
                    allUnreadMessage = {allUnreadMessage}
                />
            </View>
        )
    }
    renderQuickActions = ({item})=>{
        const {
            removeSessionList,
            dispatch,
        } = this.props
        return (
            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={[styles.actionButton,{backgroundColor:'red'}]}
                    activeOpacity={1}
                    onPress={()=>{
                        dispatch(removeSession(item.relation_id,removeSessionList))
                        dispatch(selectedSessionListItem({
                            id: item.relation_id,
                        }))
                    }}
                >
                    <Text style={styles.actionButtonText}>隐藏</Text>
                </TouchableOpacity>
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
    view3:{
        margin:10,
        borderRadius:5,
        backgroundColor:'#fff',
        height:35,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    image1:{
        height:17,
        width:17,
        marginRight:5,
    },
    text1:{
        fontSize:16,
        color:'#bfbfbf',
    },
    actionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    actionButton: {
        width: 80,
        backgroundColor: '#999999',
        alignItems:'center',
        justifyContent:'center',
    },
    actionButtonText: {
        fontSize:16,
        color:'#fff',
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
        removeSessionList,
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
        removeSessionList,
    };
};

export default connect(mapStateToProps)(MessageListView);
