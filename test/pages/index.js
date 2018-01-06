/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { initializeSDKWithOptions } from "../../src/Root";


// token
// 李杰   4578c4c14328771b3c347af42e5ad5c5871523df
// 刘金萌  37c10c6d2aaca95215c53b89c32173135d995482

const instructions = Platform.select({
    ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
    android: "Double tap R on your keyboard to reload,\n" +
        "Shake or press menu button for dev menu"
});

export default class Index extends Component{
    componentDidMount(){
        initializeSDKWithOptions({
            access_token: '3f5d616168c826b73f8195163e39af118962f045'
        })
        .then((e)=>{

        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to 魔际 IM!
                </Text>
                <Text style={styles.instructions}>
                    To get started, use App
                </Text>
                <Text style={styles.instructions}>
                    Please click 「初始化sdk」
                </Text>
                <Text style={styles.instructions}>
                    Click again 「打开对话列表」
                </Text>

                <Button
                    title = {'初始化sdk'}
                    onPress = {()=>{
                        initializeSDKWithOptions({
                            access_token: '3f5d616168c826b73f8195163e39af118962f045'
                        })
                    }}
                />
                <Button
                    title = {'打开对话列表'}
                    onPress = {()=>{
                        const {
                            navigation
                        } = this.props
                        navigation.navigate('Message',{
                            ac: true
                        })
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 10,
        marginTop:10,
        fontSize:18,
    }
});
