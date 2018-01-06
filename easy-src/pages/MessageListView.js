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




class MessageListView extends Component{
    state = {

    };
    static navigationOptions = (e)=>{
        return {
            headerLeft: (
                <HeaderBackButton
                    title = {'返回'}
                    tintColor = {'#fff'}
                    onPress = {()=>{
                        e.screenProps.propsNavigation.goBack()
                    }}
                />
            )
        }
    }
    componentDidMount(){
    }
    render() {
        console.log('MessageListView',this.props.navigation);
        const {
            sessionListData,
            allUserInfoData,
            allUnreadMessage,
            socketInstance,
            dispatch,
            sessionListRefreshing,
            navigation,
            allMessageListData,
        } = this.props

        return (
            <View style={{flex:1}}>
                <StatusBar
                    animated = {true}
                    barStyle = {'light-content'}
                />
                <FlatList
                    data={sessionListData}
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
                        dispatch(sessionListRefresh())

                        socketInstance.send(JSON.stringify({
                            type: 'message.session.list',
                        }))
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
    } = store.message
    return {
        connectState,
        sessionListData,
        allUserInfoData,
        allUnreadMessage,
        socketInstance,
        sessionListRefreshing,
        allMessageListData,
    };
};

export default connect(mapStateToProps)(MessageListView);
