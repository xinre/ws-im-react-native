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
    TouchableHighlight,
} from 'react-native';

import {PublicStyles,PublicStylesString,windowWidth,windowHeight,ThemeStyle} from '../utils/PublicStyleModule';
import Icon from 'react-native-vector-icons/FontAwesome';
import {selectedSessionListItem} from '../actions/message/sessionList';
import { Badge } from 'antd-mobile';
import {emojify} from "../pages/MessageEmojiGroup";



export default class MessageSessionListRow extends Component{
    render() {
        const {
            itemData,
            allUserInfoData,
            allUnreadMessage,
            navigation,
            dispatch,
            allMessageListData,
        } = this.props

        const data = allUserInfoData[itemData.relation_id]

        if(!data){
            return null
        }

        return (
            <TouchableHighlight
                activeOpacity = {0.9}
                underlayColor = {'#000'}
                onPress = {()=>{
                    navigation.navigate('MessageDetail',{
                        id: data.id,
                    })
                    dispatch(selectedSessionListItem({
                        id: data.id,
                    }))
                }}
            >
                <View
                    style={styles.view1}
                >
                    <Badge text={allUnreadMessage[itemData.relation_id]}>
                        <Image
                            source = {data.avatar&&data.avatar.length?{uri:data.avatar}:require('../images/defaultAvatar-man.png')}
                            style={styles.image1}
                        />
                    </Badge>
                    <View style={styles.view2}>
                        <Text
                            style={styles.Text1}
                            numberOfLines={1}
                        >
                            {data.nickname}
                        </Text>
                        {this.recentMessage()}
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    recentMessage(){
        const {
            itemData,
            allMessageListData,
        } = this.props
        const messageData = allMessageListData[itemData.relation_id]
        if(messageData&&messageData.list[0]){
            const recentMessageData = messageData.list[0]
            switch (recentMessageData.content_type) {
                case 'text':
                    return (
                        <Text style={styles.Text2} numberOfLines={1}>
                            {emojify(recentMessageData.content.text_content)}
                        </Text>
                    )
                case 'image':
                    return (
                        <Text style={styles.Text2}>[图片]</Text>
                    )
                case 'template':
                    return (
                        <Text style={styles.Text2}>[模板消息]</Text>
                    )
                default:
                    return(
                        <Text style={styles.Text2}>未知类型</Text>
                    )
            }
        }
    }
}



const styles = StyleSheet.create({
    view1:{
        height:80,
        flexDirection:'row',
        backgroundColor:'#fff',
        paddingHorizontal:10,
        paddingVertical:10,
    },
    image1:{
        height:60,
        width:60,
        borderRadius:30,
    },
    view2:{
        flex:1,
        marginLeft:20,
        paddingVertical:5,
        marginTop:7,
    },
    Text1:{
        fontSize:16,
        fontWeight:'400',
        marginBottom:5,
    },
    Text2:{
        fontSize:16,
        color:'#666',
    },
})
