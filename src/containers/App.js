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
import Navigator,{MessageDetailNavigator} from './Navigator';
import { addNavigationHelpers } from 'react-navigation';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        const {
            // initialRouteName,
            ...params
        } = this.props.propsNavigation.state.params || {}
        this.Root = Navigator({
            initialRouteParams:{...params},
            initialRouteName: this.props.initialRouteName
        })
    }
    componentDidMount(){

    }
    render() {
        const {
            screenProps
        } = this.props
        // const {
        //     initialRouteName,
        //     ...params
        // } = this.props.propsNavigation.state.params || {}
        // if(initialRouteName==='MessageDetail'){
        //     const Root = MessageDetailNavigator({initialRouteParams:{...params}})
        //     return (
        //         <View style={{ flex: 1 }}>
        //             <Root
        //                 screenProps = {{
        //                     propsNavigation: this.props.propsNavigation,
        //                     ...screenProps,
        //                 }}
        //             />
        //         </View>
        //     )
        // }
        const Root = this.Root
        return (
            <View style={{ flex: 1 }}>

                <Root
                    screenProps = {{
                        propsNavigation: this.props.propsNavigation,
                        ...screenProps,
                    }}
                    // navigation = {addNavigationHelpers({
                    //     dispatch: this.props.dispatch,
                    //     state: this.props.navigation,
                    // })}
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
