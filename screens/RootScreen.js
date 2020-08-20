import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, Linking, Alert, ActivityIndicator } from 'react-native';
import AssafinaNavigator from '../navigation/AssafinaNavigator';
import { useSelector } from 'react-redux';
import CustomColors from '../constants/CustomColors';
import MyText from '../components/MyText';

const RootScreen = (props) => {
    const notificationIsLoading = useSelector(state => state.posts.notificationIsLoading)
    if (notificationIsLoading) {
        return (
            <View style={styles.screen}>
                <MyText>Opening article...</MyText>
                <ActivityIndicator size="large" color={CustomColors.primaryColor} ></ActivityIndicator>
            </View >
        )
    }
    return (
        <AssafinaNavigator></AssafinaNavigator>
    )
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export default RootScreen;