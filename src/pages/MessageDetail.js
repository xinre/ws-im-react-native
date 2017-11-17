//@flow

import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    KeyboardAvoidingView,
} from 'react-native';

import {PublicStyles,PublicStylesString,windowWidth,windowHeight,ThemeStyle} from '../utils/PublicStyleModule';
import {Toast} from '../utils/PublicFuncitonModule';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import store from "../store";
import MessageListRow from "../components/MessageListRow";
import MessageSend from "../components/MessageSend";
import {refreshingChange} from "../actions/message";
import {setListViewInstance} from '../actions/message';
import Modal from 'react-native-modal'
import Gallery from 'react-native-image-gallery';
import KeyboardSpacer from 'react-native-keyboard-spacer';



class MessageDetail extends Component{
    static navigationOptions = (e)=>{
        const {
            allUserInfoData,
        } = store.getState().message
        const {
            id
        } = e.navigation.state.params
        return {
            title: allUserInfoData[id]?allUserInfoData[id].nickname:'未知昵称',
        }
    }

    // scrollToEnd: Function = ()=>{};
    // showImageModal: Function = ()=>{};
    FlatList: {scrollToEnd: Function} = {scrollToEnd:()=>{}};
    MessageSend: {onResponderGrant: Function} = {onResponderGrant:()=>{}};
    scrollTop: number = 0;
    layoutHeight: number = 0;
    contentHeight: number = 0;
    state: {
        isModalVisible: boolean,
        imageUrl: string,
    } = {
        isModalVisible: false,
        imageUrl: ''
    }

    constructor(props: any) {
        super(props);
        this.scrollToEnd = this.scrollToEnd.bind(this)
        this.showImageModal = this.showImageModal.bind(this)
    }
    componentDidMount(){
        this.props.dispatch(setListViewInstance(this.scrollToEnd))
    }
    componentDidUpdate(prevProps,prevState){

        // console.log(prevProps.allMessageListData);
        // console.log(prevState);
        // // console.log(this.props.allMessageListData)
        // setTimeout(()=>{
        //     this.scrollToEnd()
        //
        // },100)
    }
    render() {

        const {
            allMessageListData,
            navigation,
            userInfo,
            allUserInfoData,
            socketInstance,
            dispatch,
            refreshing,
        } = this.props

        const {
            id
        } = navigation.state.params

        const messageList = allMessageListData[id]? allMessageListData[id].list : null

        const selectedUserInfo = allUserInfoData[id]

        const dataSource = messageList ? [...messageList].reverse() : []

        return (
            <View style={{flex:1}}>
                <SafeAreaView style={{flex:1,backgroundColor:'#F5F5F7'}}>

                    <FlatList
                        ref = {(e)=>{this.FlatList=e}}
                        data={dataSource}
                        renderItem={({item,index}) => (
                            <MessageListRow
                                data = {item}
                                userInfo = {userInfo}
                                selectedUserInfo = {selectedUserInfo}
                                index = {index}
                                showImageModal = {this.showImageModal}
                            />
                        )}
                        keyExtractor={(item)=>item.sign}
                        style = {{backgroundColor:'#EBEBEB',flex:1}}
                        refreshing = {refreshing}
                        onRefresh = {()=>{
                            const nativeData = allMessageListData[id]
                            if(nativeData){
                                const {
                                    current_page,
                                    total_page,
                                    next_cursor,
                                } = nativeData.page_data
                                if(current_page<total_page){
                                    this.onRefresh({
                                        page: next_cursor,
                                        rows: 10,
                                    },{id})
                                }else{
                                    Toast.info('没有更多消息了')
                                }
                            }
                        }}
                        onResponderGrant = {()=>{
                            this.MessageSend.onResponderGrant()
                        }}
                        onScroll = {(e)=>{
                            this.scrollTop = e.nativeEvent.contentOffset.y
                        }}
                        onLayout = {(e)=>{
                            this.layoutHeight = e.nativeEvent.layout.height
                        }}
                        onContentSizeChange = {(e,a)=>{
                            this.contentHeight = a
                        }}
                    />
                    <MessageSend
                        ref = {(e)=>{this.MessageSend=e}}
                        selectedId = {id}
                        socketInstance = {socketInstance}
                        allMessageListData = {allMessageListData}
                        userInfo = {userInfo}
                        dispatch = {dispatch}
                        scrollToEnd = {this.scrollToEnd}
                    />
                    <KeyboardSpacer/>
                </SafeAreaView>

                <Modal isVisible={this.state.isModalVisible} style={{padding:0,margin:0}}>
                    <View style={{ flex: 1 }}>
                        <Gallery
                            style={{flex: 1, backgroundColor: 'black'}}
                            initialPage = {0}
                            images={[{source: {uri: this.state.imageUrl}}]}
                        />
                        <Icon
                            name="times-circle-o"
                            size={30}
                            style={{position:'absolute',top:50,right:20}}
                            color={'#fff'}
                            onPress = {()=>{
                                this.setState({
                                    isModalVisible: false,
                                })
                            }}
                        />
                    </View>
                </Modal>
            </View>
        )
    }
    onRefresh(e,{id}){
        const {
            socketInstance,
            dispatch
        } = this.props
        dispatch(refreshingChange(true))
        const params = Object.assign({},{
            type: 'user',
            relation_id: id,
            page: 1,
            rows: 10,
        },e)
        socketInstance.send(JSON.stringify({
            type: 'message.list',
            data: params
        }))
    }
    scrollToEnd(e){
        const {
            scrollTop,
            layoutHeight,
            contentHeight,
        } = this
        if(!this.FlatList){
            return false
        }
        if(e){
            this.FlatList.scrollToEnd({animated: false})
        }else {
            if((contentHeight-layoutHeight-scrollTop)<400){
                this.FlatList.scrollToEnd({animated: false})
            }
        }
    }
    showImageModal({imageUrl}){
        this.setState({
            isModalVisible: true,
            imageUrl,
        })
    }
}



const styles = StyleSheet.create({

})


const mapStateToProps = store => {
    const {
        allMessageListData,
        allUserInfoData,
        socketInstance,
        refreshing,
    } = store.message
    const {
        userInfo,
    } = store.userIndex
    return {
        allMessageListData,
        userInfo,
        allUserInfoData,
        socketInstance,
        refreshing,
    };
};

export default connect(mapStateToProps)(MessageDetail);
