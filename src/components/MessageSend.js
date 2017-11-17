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
} from 'react-native';

import {PublicStyles,PublicStylesString,windowWidth,windowHeight,ThemeStyle} from '../utils/PublicStyleModule';
import {Toast} from '../utils/PublicFuncitonModule';
import Icon from 'react-native-vector-icons/FontAwesome';
import {selectedSessionListItem} from '../actions/message/sessionList';
import {DateFormat} from '../utils/PublicFuncitonModule';
import {addMessageItemData} from "../actions/message/messageSend";
import {emojiArray} from "../pages/MessageEmojiGroup";
import Emoji from 'react-native-emoji';
import ImagePicker from 'react-native-image-picker';



const options = {
    title: "选择照片",
    cancelButtonTitle: "取消",
    takePhotoButtonTitle: "拍照",
    chooseFromLibraryButtonTitle: "从相册中选择",
    storageOptions: {
        skipBackup: true,
        path: "images"
    },
    maxWidth: 700,
    maxHeight: 700
};


export default class MessageSend extends Component{
    textInput: {
        isFocused:Function,
        blur:Function,
    } = {
        isFocused:()=>{},
        blur:()=>{},
    };
    state = {
        textInputValue: '',
        showEmoji: false,
        showMore: false,
        isFocused: false,
    };
    constructor(props: any) {
        super(props);
        this.onResponderGrant = this.onResponderGrant.bind(this)
    }
    componentDidMount(){

    }
    render() {
        const {
            showEmoji,
            showMore,
            textInputValue,
            isFocused,
        } = this.state

        return (

                <View style={styles.view1}>
                    <View style={styles.view2}>
                        <View style={styles.view3}>
                            <TextInput
                                ref = {(e)=>{this.textInput=e}}
                                style = {styles.textInput1}
                                underlineColorAndroid={'transparent'}
                                value = {textInputValue}
                                onChangeText = {(e)=>{
                                    this.setState({
                                        textInputValue: e
                                    })
                                }}
                                onSubmitEditing = {()=>{
                                    const {
                                        textInputValue
                                    } = this.state
                                    if(textInputValue&&textInputValue.length){

                                        this.sendMessage({
                                            content_type: 'text',
                                            text_content: textInputValue,
                                        })

                                        this.setState({
                                            textInputValue: ''
                                        })

                                    }else {
                                        Toast.warn('请输入内容')
                                    }
                                }}
                                enablesReturnKeyAutomatically = {true}
                                returnKeyType = {'send'}
                                onFocus = {()=>{

                                    this.setState({
                                        isFocused: true
                                    },()=>{
                                        setTimeout(()=>{
                                            this.listViewScrollToEnd()
                                        },50)
                                    })

                                    if(showEmoji){
                                        setTimeout(()=>{
                                            this.setState({
                                                showEmoji: !showEmoji
                                            })
                                        },50)
                                    }

                                    if(showMore){
                                        setTimeout(()=>{
                                            this.setState({
                                                showMore: !showMore
                                            })
                                        },50)
                                    }

                                }}
                                onBlur = {()=>{
                                    this.setState({
                                        isFocused: false
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.view4}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style = {styles.button1}
                                onPress = {()=>{

                                    this.setState({
                                        showEmoji: !showEmoji
                                    },()=>{
                                        this.listViewScrollToEnd()
                                    })

                                    if(showMore){
                                        this.setState({
                                            showMore: !showMore
                                        })
                                    }

                                    if(isFocused){
                                        this.textInput.blur()
                                    }

                                    setTimeout(()=>{
                                        if(showEmoji){
                                            this.textInput.focus()
                                        }
                                    },50)

                                }}
                            >
                                {
                                    showEmoji
                                    ?   <Image
                                            source = {require('../images/defaultKeyboard.png')}
                                            style = {styles.image1}
                                        />
                                    :   <Image
                                            source = {require('../images/defaultEmoji.png')}
                                            style = {styles.image1}
                                        />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress = {()=>{
                                    this.setState({
                                        showMore: !showMore
                                    },()=>{
                                        this.listViewScrollToEnd()
                                    })

                                    if(showEmoji){
                                        this.setState({
                                            showEmoji: !showEmoji
                                        })
                                    }

                                    if(isFocused){
                                        this.textInput.blur()
                                    }

                                }}
                            >
                                <Image
                                    source = {require('../images/defaultMore.png')}
                                    style = {styles.image1}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        this.emojiView()
                    }
                    {
                        this.moreView()
                    }
                </View>
        )
    }
    emojiView(){
        const {
            showEmoji
        } = this.state
        if(showEmoji){
            return(
                <View style={styles.view5}>
                    {
                        emojiArray.map((data,i)=>(
                            <TouchableOpacity
                                activeOpacity={1}
                                key = {i}
                                onPress = {()=>{
                                    this.setState((e)=>{
                                        e.textInputValue = `${e.textInputValue}${data}`
                                        return e
                                    })
                                }}
                            >
                                <Emoji
                                    name={data}
                                    style = {[styles.emoji1]}
                                />
                            </TouchableOpacity>
                        ))
                    }
                </View>
            )
        }
    }
    moreView(){
        const {
            showMore
        } = this.state
        if(showMore){
            const newArray = [
                {
                    title: '照片',
                    onPress: ()=>{
                        ImagePicker.launchImageLibrary(options, (response) => {
                            if(response.error) {
                    	  		console.log('系统异常，请稍后再试')
                    		} else if (response.didCancel) {
                    			console.log('User cancelled image picker');
                    		}else{
                                this.uploadImage({
                                    dataURL: `data:image/jpeg;base64,${response.data}`
                                })
                    		}
                    	})
                    },
                    image: require('../images/defaultPhotos.png'),
                },{
                    title: '拍摄',
                    onPress: ()=>{
                        ImagePicker.launchCamera(options, (response) => {
                            if(response.error) {
                    	  		console.log('系统异常，请稍后再试')
                    		} else if (response.didCancel) {
                    			console.log('User cancelled image picker');
                    		}else{
                                this.uploadImage({
                                    dataURL: `data:image/jpeg;base64,${response.data}`
                                })
                    		}
                    	})
                    },
                    image: require('../images/defaultCamera.png'),
                },
            ]
            return (
                <View style={styles.view6}>
                    {
                        newArray.map((data,i)=>(
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.button2}
                                key = {i}
                                onPress = {()=>{data.onPress()}}
                            >
                                <View style={styles.view7}>
                                    <Image
                                        source = {data.image}
                                        style = {styles.image2}
                                        resizeMode = {'contain'}
                                    />
                                </View>
                                <Text style={styles.text1}>
                                    {data.title}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            )
        }
    }
    uploadImage({dataURL}:{dataURL: string}){
        this.sendMessage({
            content_type: 'image',
            image_url: dataURL,
            isSend: false,
        })
        .then(({sign})=>{
            fetch("http://api.pinggai.cc/api/upload/imagesBinary", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "message_image",
                    file: dataURL,
                    access_token: "f914f40705ced1e4495f1764d9f571aba1d7fe69"
                })
            })
            .then(e => e.json())
            .then(e =>{
                if(e.errcode===0){
                    this.sendMessage({
                        content_type: 'image',
                        image_url: e.data['oss-request-url'],
                        removeSign: sign
                    })
                }else {
                    Toast.error('上传失败')
                }
            })
        })
        .catch(err => {
            Toast.error('上传错误')
        })
    }
    sendMessage({
        content_type,
        text_content,
        image_url,
        isSend,
        isAdd,
        removeSign
    }: {
        content_type?: string,
        text_content: string,
        image_url?: string,
        isSend?: boolean,
        isAdd?: boolean,
        removeSign?: string,
    }){

        const {
            dispatch,
            userInfo,
            allMessageListData,
            socketInstance,
            selectedId,
            // listViewInstance,
        } = this.props

        const timestamp: number = Date.parse(new Date().toString())/1000
        const sign = `${timestamp}${generateMixed(18)}`

        let newParams: {
            data:{
                text_content?: string,
                image_url?: string
            },
        } = {
            type: 'message',
            data: {
                type: 'user',
                sign,
                relation_id: selectedId,
                content_type,
            }
        }

        let newData: {
            data:{
                text_content?: string,
                image_url?: string
            },
            removeSign?: string,
        } = {
            id: selectedId,
            allMessageListData,
            data: {
                create_time: timestamp,
                content_type,
                sign,
                relation_id: selectedId,
                user_id: userInfo.id,
            }
        }

        switch (content_type) {
            case 'text':
                newParams.data['text_content'] = text_content
                newData.data['text_content'] = text_content
                break;
            case 'image':
                newParams.data['image_url'] = image_url
                newData.data['image_url'] = image_url
                if(removeSign){
                    newData.removeSign=removeSign
                }
                break;
            default:
                Toast.info('未知发送类型',1)
                return false
        }

        if(isSend!==false){
            socketInstance.send(JSON.stringify(newParams))
        }

        if(isAdd!==false){
            dispatch(addMessageItemData(newData))
        }

        // listViewInstance&&listViewInstance(true)

        return new Promise(resolve => {
            resolve({
                sign
            })
        })
    }
    onResponderGrant(){
        const {
            showEmoji,
            showMore,
        } = this.state
        if(showEmoji){
            this.setState({
                showEmoji: !showEmoji
            })
        }

        if(showMore){
            this.setState({
                showMore: !showMore
            })
        }

        const isFocused = this.textInput.isFocused()
        if(isFocused){
            this.textInput.blur()
        }
    }
    listViewScrollToEnd(){
        const {
            scrollToEnd
        } = this.props
        setTimeout(()=>{
            scrollToEnd(true)
        },50)
    }
}

const emojiWidth = (windowWidth-30)/9

const styles = StyleSheet.create({
    view1:{
        backgroundColor:'#F5F5F7',
        borderTopWidth:1,
        borderColor:'#E7E7E9',
    },
    view2:{
        height:45,
        paddingVertical:5,
        flexDirection:'row',
    },
    view3:{
        backgroundColor:'#fff',
        marginHorizontal:10,
        flex:1,
        borderWidth:1,
        borderColor:'#E8E8E9',
        borderRadius:3,
    },
    textInput1:{
        padding:0,
        fontSize:14,
        color:'#000',
        flex:1,
        marginHorizontal:5,
    },
    keyboardAvoidingView1:{

    },
    view4:{
        marginRight:10,
        flexDirection:'row',
        alignItems:'center',
    },
    button1:{
        marginRight:10,
    },
    image1:{
        height:25,
        width:25,
    },
    view5:{
        borderTopWidth:1,
        borderColor:'#EBECEE',
        paddingHorizontal:15,
        paddingBottom:15,
        flexDirection:'row',
        flexWrap:'wrap',
    },
    emoji1:{
        fontSize:emojiWidth*0.7,
        marginLeft:emojiWidth*0.3,
        marginTop:15,
    },
    view6:{
        borderTopWidth:1,
        borderColor:'#EBECEE',
        paddingHorizontal:15,
        paddingBottom:15,
        flexDirection:'row',
        flexWrap:'wrap',
    },
    button2:{
        marginHorizontal:15,
        marginTop:15,
        alignItems:'center',
    },
    image2:{
        width:'60%',
        height:'60%',
    },
    view7:{
        width:(windowWidth-(5*30))/4,
        height:(windowWidth-(5*30))/4,
        borderWidth:1,
        borderColor:'#EAE9EC',
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
    },
    text1:{
        fontSize:12,
        color:'#9A999B',
        marginTop:7,
    },
})

function generateMixed(n) {
    const jschars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*30);
        res += jschars[id];
    }
    return res;
}
