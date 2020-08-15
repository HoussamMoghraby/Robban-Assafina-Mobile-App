import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Linking, Text, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import CustomColors from '../constants/CustomColors';

const WebviewScreen = (props) => {
    //console.log(props);
    const [loading, setIsLoading] = useState(true);
    return (
        <View style={styles.container}>
            {
                loading ?
                    <ActivityIndicator style={{ zIndex: 999, position: 'absolute', top: (Dimensions.get('window').height / 2) - 85, left: (Dimensions.get('window').width / 2) - 18 }} size="large" color={CustomColors.primaryColor}></ActivityIndicator>
                    : <View></View>
            }
            <WebView
            onMessage = {()=>{}}
                onLoad={() => { setTimeout(() => { setIsLoading(false); }, 1000) }}
            //     injectedJavaScript="
            // jQuery('#wpadminbar').hide();
            // jQuery('header').hide();
            // jQuery('#sidebar-right').parent().hide();
            // jQuery('footer').hide();
            // jQuery('.breadcrumb').hide();
            // jQuery('.heateor_sss_sharing_container').remove();
            // jQuery('.back-to-top').remove();"
                bounces={false}
                //domStorageEnabled={true}
                startInLoadingState={false}
                onShouldStartLoadWithRequest={(event) => {
                    //console.log(event);
                    // if (event && event.url && event.mainDocumentURL != 'about:blank') {
                    //     Linking.openURL(event.url);
                    //     return false;
                    // }
                    return true;
                }}
                allowsLinkPreview={false}
                scrollEnabled={true}
                scalesPageToFit={false}
                style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                source={{ uri: props.navigation.getParam('url') }}
                javaScriptEnabled={true}></WebView>
        </View>
    )
};

WebviewScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: navigationData.navigation.getParam('title')
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: -56,
        justifyContent: 'flex-start',
        backgroundColor: '#fff'
    }
});

export default WebviewScreen;