import {Platform} from "react-native";
import { StackNavigator } from "react-navigation";
import { PublicStyles, ThemeStyle } from "../utils/PublicStyleModule";
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import IndexView from "../pages";
import Message from "../../src/Root";
import TestTab from "../pages/tab";




const Navigator = StackNavigator(
    {
        IndexView: {
            screen: IndexView,
            navigationOptions: {
                headerTintColor: "#fff",
                headerStyle : {
                    backgroundColor: '#3699FF',
                },
                title: '魔际 IM'
            },
        },
        Message : {
            screen: Message,
            navigationOptions:{
                header : null,
            },
        },
        TestTab : {
            screen: TestTab,
            navigationOptions:{
                header : null,
            },
        },



    },
    {
        navigationOptions: {
            headerTintColor: ThemeStyle.ThemeColor,
            gesturesEnabled : true,
            headerStyle : {
                backgroundColor: "#fff",
            },
        },
        initialRouteName: 'IndexView',
        initialRouteParams: { isCloseable: true },
        mode: "card",
        ...Platform.select({
            ios: {
                headerMode: 'float',
            },
            android: {
                headerMode: 'screen',
                transitionConfig:()=>({
                    screenInterpolator:CardStackStyleInterpolator.forHorizontal,
                })
            },
        }),
    }
)

export default Navigator
