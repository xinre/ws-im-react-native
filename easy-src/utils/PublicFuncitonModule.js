import React, { Component } from "react";
import {
    Platform,
    ToastAndroid,
    Dimensions,
    Navigator,
    View
} from "react-native";
import RootSiblings from "react-native-root-siblings";
import DropdownAlert from "react-native-dropdownalert";
import {windowWidth,windowHeight,ThemeStyle} from './PublicStyleModule';

export class Toast {
    static info(e) {
        Toast.DropdownAlert("info", "提示", e);
    }
    static warn(e) {
        Toast.DropdownAlert("warn", "警告", e);
    }
    static error(e) {
        Toast.DropdownAlert("error", "错误", e);
    }
    static DropdownAlert(type, title, text) {
        const textString = text.toString();
        let sibling = new RootSiblings(
            (
                <DropdownAlert
                    ref={ref => {
                        ref.alertWithType(type, title, textString);
                    }}
                    infoColor={ThemeStyle.ThemeColor}
                    closeInterval = {2000}
                />
            )
        );
    }
}

//时间戳转日期
export function DateFormat(date,geshi){
  if(date){
    return (new Date(date*1000)).Format(geshi)
  }else{
    return (new Date()).Format(geshi)
  }
}

Date.prototype.Format = function(fmt)
{
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

//获取指定日期的时间戳
export function toTimeStamp(e) {
  return Date.parse(new Date(e))/1000;
}
//获取当前时间戳
export function getTimeStamp() {
  return Date.parse(new Date())/1000;
}
