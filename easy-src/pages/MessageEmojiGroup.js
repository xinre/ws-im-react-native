import React, { Component } from "react";
import PropTypes from 'prop-types';
import Emoji from 'react-native-emoji';

const emojiArrayDataSource = [
    "smile",
    "laughing",
    "blush",
    "heart_eyes",
    "smirk",
    "flushed",
    "grin",
    "kissing_smiling_eyes",
    "wink",
    "kissing_closed_eyes",
    "stuck_out_tongue_winking_eye",
    "sleeping",
    "worried",
    "sweat_smile",
    "cold_sweat",
    "joy",
    "sob",
    "angry",
    "mask",
    "scream",
    "sunglasses",
    "thumbsup",
    "clap",
    "ok_hand"
];

export const emojiArray = emojiArrayDataSource.map((e)=>{return `:${e}:`})

export const EmojiComponent = ({data,index,style})=>(
    <Emoji
        name = {data}
    />
)
// const emojiGroupImage = require('../../../images/emojiGroup.png')
//
// export default class EmojiGroup extends Component {
//     state = {
//         emojiArray,
//     };
//     render() {
//         return (
//             <View className={styles.view1}>
//                 {
//                     emojiArray.map((data,i)=>(
//                         <EmojiComponent
//                             onClick={()=>{
//                                 this.props.onSelect({
//                                     emoji: data,
//                                 })
//                             }}
//                             key = {i}
//                             index = {i}
//                         />
//                     ))
//                 }
//             </View>
//         )
//     }
// }


export const emojify = (str, options = {}) => {
    const convertedParts = str.split(shortnamesRegexStr).filter(Boolean).map((part, index, parts) => {
        const emojiIndex = emojiArray.findIndex((e)=>{return e===part})
        if(emojiIndex!==-1){
            // console.log(part);
            // return null
            return(
                <EmojiComponent
                    data = {part}
                    index = {emojiIndex}
                    key = {index}
                    style = {{margin:0}}
                />
            )
        }
        return part;
    });

    return convertedParts
};

const shortnamesRegexStr = RegExp(`(:[+-\\d\\w]+:)`)
