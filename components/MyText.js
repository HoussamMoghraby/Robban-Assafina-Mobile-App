import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { isPlatformIOS } from '../helpers/Platform';

const MyText = (props) => {
    const fontStyle = props.bold ? styles.boldFont : styles.standardFont;
    return (
        <Text numberOfLines={props.numberOfLines} style={{ ...props.style, ...fontStyle, ...((isPlatformIOS() && isArabic(props.children)) ? textRight : '') }}> {props.children}</Text >
    );
}

const styles = StyleSheet.create({
    standardFont: {
        fontFamily: 'open-sans',
    },
    boldFont: {
        fontFamily: 'open-sans-bold'
    },
    textRight: {
        textAlign: 'right'
    }
});

// const getTextDirection = (text) => {
//     let textDirection = '';
//     if (isPlatformIOS() && isArabic(text))
//         textDirection = 'right';
//     return textDirection;
// }

const isArabic = (text) => {
    var arabic = /[\u0600-\u06FF]/;
    result = arabic.test(text);
    return result;
}

export default MyText;