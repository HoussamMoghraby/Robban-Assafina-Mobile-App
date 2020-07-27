import React from 'react';
import { Text, StyleSheet } from 'react-native';

const MyText = (props) => {
    const fontStyle = props.bold ? styles.boldFont : styles.standardFont;
    return (
        <Text numberOfLines={props.numberOfLines} style={{ ...props.style, ...fontStyle }}> {props.children}</Text >
    );
}

const styles = StyleSheet.create({
    standardFont: {
        fontFamily: 'open-sans'
    },
    boldFont: {
        fontFamily: 'open-sans-bold'
    }
});

export default MyText;