import types from '../constants/ActionTypes';
import AppNavigator from "../containers/Navigator";

const initialState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams("MessageListView")
);

export default (state = initialState, action) => {
    let nextState;
    switch (action.type) {
        // case "Login":
        //     nextState = AppNavigator.router.getStateForAction(
        //         //  getStateForAction: 根据给定的action来定义返回的navigation sate
        //         NavigationActions.back(), // action  返回上一屏幕并关闭当前屏幕
        //         state // state
        //     );
        //     break;
        // case "Logout":
        //     nextState = AppNavigator.router.getStateForAction(
        //         NavigationActions.navigate({ routeName: "Login" }), // 通过navigat action 改变当前state
        //         state
        //     );
        //     break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    return nextState || state;
};
