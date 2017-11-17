//@flow

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
import { addNavigationHelpers } from 'react-navigation';


class App extends Component {
    componentDidMount(){


    }
    render() {

        return (
            <View style={{ flex: 1 }}>

                <Navigator
                    screenProps = {{
                        propsNavigation: this.props.propsNavigation
                    }}
                    navigation = {addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.navigation,
                    })}
                />

            </View>
        )

    }

}




const mapStateToProps = store => {
    return {
        login: store.userIndex.login,
        showBootPage: store.appInitial.showBootPage,
        navigation: store.navigation
    };
};

export default connect(mapStateToProps)(App);
