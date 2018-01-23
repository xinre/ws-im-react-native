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
import {DateFormat} from '../utils/PublicFuncitonModule';
import { Badge } from 'antd-mobile';
import {emojify} from "../pages/MessageEmojiGroup";
import FitImage from 'react-native-fit-image';



export default class MessageListRow extends Component{
    render() {
        const {
            data,
            userInfo,
            index,
        } = this.props

        return (
            <View style={[styles.view1,index===0&&{marginTop:15}]}>
                <View style={styles.view2}>
                    <View style={styles.view3}>
                        <Text style={styles.text1}>{DateFormat(data.create_time,'MM/dd hh:mm')}</Text>
                    </View>
                </View>
                {
                    data.user_id===userInfo.id
                    ?   this.rightView(data)
                    :   this.leftView(data)
                }
            </View>
        )
    }
    leftView(data:{content_type: string,content:{text_content: ?string,image_url: ?string}}){
        const {
            selectedUserInfo
        } = this.props
        return(
            <View style={styles.view4}>
                <Image
                    source = {selectedUserInfo.avatar&&selectedUserInfo.avatar.length?{uri:selectedUserInfo.avatar}:require('../images/defaultAvatar-man.png')}
                    style={styles.image1}
                />
                <View style={styles.view10}>
                    <View style={styles.view5}>
                        {
                            this.contentView({data,left:true,right:false})
                        }
                        <View style={styles.view8}/>
                    </View>
                </View>
            </View>
        )
    }
    rightView(data:{content_type: string,content:{text_content: ?string,image_url: ?string}}){
        const {
            userInfo
        } = this.props
        return(
            <View style={[styles.view4,{justifyContent:'flex-end'}]}>
                <View style={styles.view11}>
                    <View style={[styles.view7]}>
                        {
                            this.contentView({data,left:false,right:true})
                        }
                        <View style={styles.view6}/>
                    </View>
                </View>
                <Image
                    source = {userInfo.avatar&&userInfo.avatar.length?{uri:userInfo.avatar}:require('../images/defaultAvatar-man.png')}
                    style={styles.image1}
                />
            </View>
        )
    }
    contentView({data,left,right} : {data:{content_type: string,content:{text_content: ?string,image_url: ?string}},left:boolean,right:boolean}){
        if(data.content){
            switch (data.content_type) {
                case 'text':
                    return(
                        <Text style={[styles.text2,right&&{color:'#fff'}]} selectable={true}>{emojify(data.content.text_content)}</Text>
                    )
                case 'image':
                    return(
                        <TouchableOpacity
                            style={styles.button3}
                            activeOpacity={1}
                            onPress = {()=>{
                                this.props.showImageModal({
                                    imageUrl: data.content.image_url
                                })
                            }}
                        >
                            <FitImage
                                source={{uri: data.content.image_url}}
                                resizeMode = {'contain'}
                            />
                        </TouchableOpacity>

                    )
                case 'template':
                    return(
                        <TouchableOpacity
                            style={styles.button4}
                            activeOpacity={1}
                            onPress = {()=>{
                                // this.setState({
                                //     visible: true,
                                //     templateData: data.content
                                // })
                            }}
                        >
                            <Text
                                style={[styles.text3,{color:right?'#fff':'#000'}]}
                                numberOfLines = {1}
                            >
                                {data.content.template_title}
                            </Text>
                            <View style={styles.view9}>
                                <Text
                                    style={[styles.text4,{color:right?'#fff':'#000'}]}
                                    numberOfLines = {3}
                                >
                                    {data.content.template_desc}
                                </Text>
                                <Image
                                    style = {styles.image3}
                                    source = {{uri:data.content.template_img}}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                default:
                    return (
                        <Text style={styles.text2}>
                            未知消息类型
                        </Text>
                    )
            }
        }else {
            return (
                <Text style={styles.text2}>
                    数据类型异常
                </Text>
            )
        }
    }
}



const styles = StyleSheet.create({
    view1:{
        // marginTop:15,
    },
    view2:{
        alignItems:'center',
    },
    view3:{
        paddingVertical:3,
        paddingHorizontal:5,
        backgroundColor:'rgba(0,0,0,0.2)',
        borderRadius:3,
    },
    text1:{
        fontSize:13,
        color:'#fff',
        backgroundColor:'rgba(0,0,0,0)',
    },
    view4:{
        marginVertical:15,
        flexDirection:'row',
        paddingHorizontal:10,
    },
    image1:{
        height:40,
        width:40,
        borderRadius:20,
    },
    view5:{
        marginLeft:10,
        backgroundColor:'#fff',
        padding:5,
        borderRadius:5,
        justifyContent:'center',
    },
    view6:{
        height:7,
        width:7,
        backgroundColor:ThemeStyle.ThemeColor,
        transform:[
            {rotateZ: '45deg'}
        ],
        position: 'absolute',
        right:-3,
        top:15,
    },
    view7:{
        marginRight:10,
        backgroundColor:ThemeStyle.ThemeColor,
        paddingHorizontal:10,
        borderRadius:5,
        justifyContent:'center',
        paddingVertical:10,
    },
    text2:{
        fontSize:16,
        color:'#000',
    },
    view8:{
        height:7,
        width:7,
        backgroundColor:'#fff',
        transform:[
            {rotateZ: '45deg'}
        ],
        position: 'absolute',
        left:-2,
        top:15,
    },
    button3:{
        width:windowWidth-150-30,
    },
    text3:{
        fontSize:14,
        marginBottom:10,
    },
    button4:{
        width:windowWidth*0.65,
    },
    view9:{
        flexDirection:'row',
    },
    text4:{
        fontSize:12,
        flex:1,
        lineHeight:18,
        marginTop:-5,
    },
    image3:{
        width:30,
        height:30,
    },
    view10:{
        flex:1,
        flexDirection:'row',
    },
    view11:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
    },
})
