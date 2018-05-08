//@flow

import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    TextInput,
    TouchableHighlight,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Modal,
    SafeAreaView,
    ScrollView,
} from 'react-native';

import {PublicStyles,PublicStylesString,windowWidth,windowHeight,ThemeStyle} from '../utils/PublicStyleModule';
import {Toast} from '../utils/PublicFuncitonModule';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'antd-mobile';
import MessageSessionListRow from "../components/MessageSessionListRow";



export default class MessageSearch extends Component{
    state = {
        searchValue: null,
    };
    componentDidMount(){

    }
    render() {
        const {
            visible,
            close,
            dataSource,
            sessionData,
            allUserInfoData,
            navigation,
            dispatch,
            allMessageListData,
            allUnreadMessage,
        } = this.props
        const {
            searchValue
        } = this.state
        return (
            <Modal
                visible={visible}
                onRequestClose={()=>{}}
                transparent={true}
                animationType={'fade'}
            >
                <SafeAreaView style={styles.view1}>
                    <SearchBar
                        placeholder={'搜索'}
                        autoFocus={true}
                        onCancel={()=>{
                            close()
                        }}
                        onChange={(e)=>{
                            this.setState({
                                searchValue: e
                            })
                        }}
                    />
                </SafeAreaView>
                <ScrollView
                    style={styles.scrollView1}
                    keyboardDismissMode={'on-drag'}
                    keyboardShouldPersistTaps={'always'}
                >
                    {
                        searchValue&&searchValue.length
                        ?   dataSource.map((item,i)=>{
                            if(item.nickname.toLowerCase().includes(searchValue.toLowerCase())){
                                return (
                                    <MessageSessionListRow
                                        itemData = {sessionData[i]}
                                        allUserInfoData = {allUserInfoData}
                                        allUnreadMessage = {allUnreadMessage}
                                        navigation = {navigation}
                                        dispatch = {dispatch}
                                        allMessageListData = {allMessageListData}
                                        key={i}
                                        onPress={()=>{
                                            this.setState({
                                                searchValue: null
                                            },()=>{
                                                close()
                                            })
                                        }}
                                    />
                                )
                            }
                        })
                        :   null
                    }
                </ScrollView>
            </Modal>
        )
    }

}


const styles = StyleSheet.create({
    view1:{
        backgroundColor:'#F0EFF5',
    },
    scrollView1:{
        backgroundColor:'#F0EFF5',
    },
})
