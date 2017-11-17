import {Platform} from "react-native";
import { StackNavigator } from "react-navigation";
import { PublicStyles, ThemeStyle } from "../utils/PublicStyleModule";
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import MessageListView from "../pages/MessageListView";
import MessageDetail from "../pages/MessageDetail";




const Navigator = StackNavigator(
    {
        MessageListView: {
            screen: MessageListView,
            navigationOptions: {
                headerTintColor: "#fff",
                headerStyle : {
                    backgroundColor: ThemeStyle.ThemeColor,
                },
                title: '最近联系人',
            },
        },
        MessageDetail: {
            screen: MessageDetail,
            navigationOptions: {
                headerTintColor: "#fff",
                headerStyle : {
                    backgroundColor: ThemeStyle.ThemeColor,
                },
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
        mode: "card",
        ...Platform.select({
            ios: {
                headerMode: 'float',
            },
            android: {
                headerMode: 'screen',
                // transitionConfig:()=>({
                //     screenInterpolator:CardStackStyleInterpolator.forHorizontal,
                // })
            },
        }),
    }
)

export default Navigator
