import {Platform,View} from "react-native";
import { StackNavigator } from "react-navigation";
import { PublicStyles, ThemeStyle } from "../utils/PublicStyleModule";
import { Provider } from "react-redux";
import store from "../store";
import React,{Component} from "react";

import MessageListViewCom from "../pages/MessageListView";
import MessageDetailCom from "../pages/MessageDetail";
import { connect } from "react-redux";


export class MessageListView extends Component {
    render() {
        return (
            <Provider store={store}>
                <MessageListViewCom
                    {...this.props}
                />
            </Provider>
        );
    }
}

export class MessageDetail extends Component {
    static navigationOptions = ({navigation,screenProps,navigationOptions})=>{
        const {
            allUserInfoData,
        } = store.getState().message
        const {
            id
        } = navigation.state.params
        return {
            title: allUserInfoData[id]?allUserInfoData[id].nickname:'正在获取',
        }
    }
    render() {
        return (
            <Provider store={store}>
                <MessageDetailCom
                    {...this.props}
                />
            </Provider>
        );
    }
}
