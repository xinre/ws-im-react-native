import React, { Component } from "react";
import {
    Text,
    View,
    Image,
    StatusBar,
    Platform
} from "react-native";



// import { Toast, AppInfo } from "../utils/PublicFuncitonModule";
// import JPushModule from '../utils/JPushModule';
import { connect } from "react-redux";
import { PublicStyles, ThemeStyle } from "../utils/PublicStyleModule";
import Navigator from './Navigator';
// import {
//     getUserMixedStateNum,
//     getUnreadAllCount
// } from "../actions/user";



class App extends Component {
    componentDidMount(){


    }
    render() {


        return (
            <View style={{ flex: 1 }}>

                <Navigator
                    aaaaa = {'sssssss'}
                />

            </View>
        )

    }

}




const mapStateToProps = store => {
    return {
        login: store.userIndex.login,
        showBootPage: store.appInitial.showBootPage,
    };
};

export default connect(mapStateToProps)(App);
