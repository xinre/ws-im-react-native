import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";

// import TabHome from '../home';
import Message from "../../src/Root";


import {
    StackNavigator,
    TabNavigator,
    TabBarBottom
} from 'react-navigation';






class TabBarItem extends Component {
    render() {
        return(
            <Image source={ this.props.focused ? this.props.selectedImage : this.props.normalImage }
                style={ [{ tintColor:this.props.tintColor,width:20,height:20 },this.props.style] }
            />
        )
    }
}




const Tab = TabNavigator(
    {
        Push: {
            screen: View,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "推送",
                title:'推送',
            })
        },
        Home: {
            screen: Message,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "首页",
                headerBackTitle: '首页',
            }),
        },
        Favor: {
            screen: View,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "FAVOR",
                title:'FAVOR',
            })
        },
        Message: {
            screen: View,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "消息",
                title:'消息',
            })
        },
        User: {
            screen: View,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "我的",
                header : null,
                headerBackTitle: '我的',
            })
        }
    },
    {
        initialRouteParams: { isCloseable: true },
        tabBarComponent: TabBarBottom,
        tabBarPosition: "bottom",
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: "#979797",
            style: { backgroundColor: "#ffffff" },
            labelStyle: {
                fontSize: 12
            },
        },
    }
);



export default Tab
