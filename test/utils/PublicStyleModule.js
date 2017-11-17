import{
    StyleSheet,
    Platform,
    Dimensions,
} from 'react-native';

export const windowWidth = Dimensions.get('window').width;

export const windowHeight = Dimensions.get('window').height;

export const PublicStylesString = {
    BottomUnderlayColor:'#333',                         //底部按钮按下去的高量颜色
    borderColor:'#f1f1f1',                              //边框颜色
    ListButtonUnderlayColor:'#f7f7f7',                  //列表按钮按下去的高亮颜色
    grayColor:'#CAC9CF',                                //辅助性文字的浅灰色
    DaZhongColor:'#FF6633',                             //大众点评的主体颜色，橙色
    DaZhongButtonUnderlayColor : '#e55b2d',                    //大众点评按钮按下去的高亮颜色
    DaZhongSearchBarActiveColor : '#D8B494',            //大众点评筛选项高亮的颜色
    DaZhongButtonActiveColor : '#FEF1ED',            //大众点评筛选项按钮高亮的背景颜色
    backgroundColor : '#F8F8F8',                        //主题背景颜色
    ThemeColor : '#ff7b23',                             //主题颜色
}

export const ThemeStyle = {
    ThemeColor : '#ff585d',                        //主题1
    ThemeSubColor : '#333',                        //主题次黑
    ThemeBorderColor : '#e3e3e3',
    ThemeColor2 : '#ff585d',                    //主题2
}

export const PublicStyles = StyleSheet.create({
    ViewHeader:{
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor:ThemeStyle.ThemeColor,
        flex:1,
    },
    NavigationBarHeader:{
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderColor:'#efefef',
    },
    ViewMax:{
    	flex:1,
    	backgroundColor:'#f5f5f5',
    },
    centerTitleStyle :{
        ...Platform.select({
            ios: {
                width:windowWidth,
                alignItems:'center',
            },
            android: {
                width:windowWidth-40,
                alignItems:'center',
                marginLeft:-20,
            },
        }),
    },
    borderColor:{
        borderColor:PublicStylesString.borderColor,
    },
    backgroundColor:{
        backgroundColor:'#F8F8F8',
    },
    Text1:{                                     //适用于商品标题
        color:'#333333',
        fontSize:14,
    },
    Text2:{                                     //适用于商品副标题
        fontSize:12,
        color:'#A1A1A1',
    },
    Text3:{                                     //副标题颜色加深
        fontSize:12,
        color:'#8D8897',
    },
    Text4:{                                     //用于距离显示，偏红色字体
        fontSize:12,
        color:'#8D8897',
    },
    Text5:{                                     //很浅的灰色字体，用于商品信息
        fontSize:11,
        color:'#8D8897',
    },
    Text6:{                                     //评价中的打分字体，颜色很黑
        fontSize:10,
        color:'#8D8897',
    },
    Text7:{                                     //评价内容的字体，颜色黑，稍大一些,用于段落
        fontSize:12,
        color:'#333',
        lineHeight:18,
    },
    Text8:{                                     //用于商店信息,小，黑
        fontSize:12,
        color:'#333',
    },
    Text9:{                                     //用于商店轮播标题文字
        fontSize:17,
        color:'#fff',
        backgroundColor:'rgba(0,0,0,0)',
    },
    Text10:{                                     //用于商店轮播描述文字
        fontSize:13,
        color:'#fff',
        backgroundColor:'rgba(0,0,0,0)',
    },
    Text11:{                                    //用于商品服务样式，小，绿
        fontSize:10,
        color:'#11cd6e',
    },
    Text12:{                                    //用于商品服务样式，小，绿
        fontSize:12,
        color:PublicStylesString.grayColor,
    },
    Text13:{                                     //适用于支付界面标题
        fontSize:14,
        color:'#333',
    },
    Text14:{                                     //适用于支付界面副标题
        fontSize:10,
        color:'#999',
        marginTop:3,
    },
    BottomButton:{
        backgroundColor:'#333',
        height:50,
        alignItems:'center',
        justifyContent:'center',
    },
    BottomText:{
        fontSize:13,
        color:'#fff',
    },
    DetailListMod:{
        backgroundColor:'#fff',
        marginBottom:10,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:PublicStylesString.borderColor,
    },
    DetailList:{
        paddingHorizontal:15,
        borderBottomWidth:1,
        borderColor:PublicStylesString.borderColor,
        flexDirection:'row',
        paddingVertical:10,
    },
    Star:{
        height:13,
        width:13,
        marginRight:4,
        marginTop:1
    },
    BottomBuyButton:{                           //用在了立刻抢购按钮
        borderRadius:3,
        backgroundColor:PublicStylesString.DaZhongColor,
    },
    activeDot:{                                 //全局轮播激活的小圆圈
        backgroundColor:'#333',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    dot:{                                       //全局轮播未激活的小圆圈
        backgroundColor:'#fff',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    paginationStyle:{                           //全局轮播按钮放置的位置
        bottom:5,
        justifyContent:'flex-end',
        right:10,
    },
})

export const UserCommentStyles = StyleSheet.create({
    UserImg : {
        width:50,
        height:50,
        borderRadius:25,
    },
    ContentView:{
        flex:1,
        marginLeft:10,
    },
    UserName:{
        color:'#666',
        fontSize:13,
    },
    ShopInfoView:{
        flexDirection:'row',
        marginVertical:10,
    },
    StarView:{
        flexDirection:'row',
        marginRight:5,
        marginLeft:5,
    },
    CommentImg:{
        height:60,
        width:60,
        resizeMode:'cover',
        marginRight:10,
    },
    CommentScrollView:{
        marginTop:10,
        flex:1,
    },
    GridView:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    GridCommentImg:{
        width:(windowWidth-105)/3,
        height:(windowWidth-105)/3,
        resizeMode:'contain',
    },
    CommentImgButton:{
        width:(windowWidth-105)/3,
        height:(windowWidth-105)/3,
        marginHorizontal:2.5,
        marginBottom:2.5,
    },
})

export const formStyles = {
    from :{

    },
    group : {
        paddingVertical:20,
        borderBottomWidth:1,
        borderColor:'#f1f1f1',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        flex:1,
        paddingHorizontal:15
    },
    label:{
        color:'#777',
        fontSize:14,
    },
    control:{
        alignItems:'center',
        flexDirection:'row',
    },
    input:{
        color:'#444',
        fontSize:15,
        width:100,
        textAlign:'right',
        height:15,
    },
    submitTouchable:{
        borderWidth:10,
        borderColor:'#fff',
        marginTop:10
    },
    submit:{
        height:50,
        backgroundColor:'#1FC194',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:3
    },
    submitText:{
        fontSize:17,
        color:'#fff',
    }
}
