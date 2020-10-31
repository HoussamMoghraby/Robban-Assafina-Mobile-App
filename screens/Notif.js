import React, { useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import * as Notifications_NEW from 'expo-notifications';

// Notifications_NEW.addNotificationResponseReceivedListener(response => {
//     console.log('APP: notification received');
//     console.log(response);
// })

export default class Notif extends React.Component {
    // onResponseReceived = async (response) => {
    //     console.log('APP: notification received');
    //     console.log(response);
    //     Alert.alert('123');
    // };

    componentDidMount() {
        // this.onResponseReceivedListener = Notifications_NEW.addNotificationResponseReceivedListener(
        //     this.onResponseReceived
        // );
    }
    render() {
        return (
            <View style={styles.screen}>

            </View>
        )
    }
};

const styles = StyleSheet.create({
    screen: {
        display: 'none'
    }
});