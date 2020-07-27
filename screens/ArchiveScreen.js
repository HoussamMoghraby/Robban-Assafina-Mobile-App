import React from 'react';
import { View, StyleSheet, Text, ImageBackground, Dimensions, Linking, Share } from 'react-native';
import MyText from '../components/MyText';
import { ScrollView } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { isPlatformAndroid } from '../helpers/Platform';
import TouchableComponent from '../components/TouchableComponent';
import CustomColors from '../constants/CustomColors';
import WebView from 'react-native-webview';
import PdfReader from 'rn-pdf-reader-js';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import * as Enumerable from 'linq-es2015';
import { useSelector } from 'react-redux';
// import * as FileSystem from 'expo-file-system'
// import * as Permissions from 'expo-permissions';
var DomParser = require('react-native-html-parser').DOMParser;

//var post;
var pdfUrl;
const downloadPDFHandler = (url) => {
    Linking.openURL(url);
    //const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //console.log(status);
    // console.log(post);
    //  FileSystem.downloadAsync('https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc', FileSystem.documentDirectory + 'assafina_docs' + 'safina.doc')
    //      .then(({ uri }) => { console.log('Finished downloading to ', uri); })
    //      .catch(error => {
    //          console.error(error);
    //      });

    //FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'assafina_docs');
}
const sharePostHandler = async (post) => {
    try {
        const result = await Share.share({
            message: post.link,
            title: post.title.rendered,
            url: post.link
        }, {
            subject: post.title.rendered,
            tintColor: CustomColors.primaryColor,
            dialogTitle: post.title.rendered
        });

        // if (result.action === Share.sharedAction) {
        //     if (result.activityType) {
        //         // shared with activity type of result.activityType
        //     } else {
        //         // shared
        //     }
        // } else if (result.action === Share.dismissedAction) {
        //     // dismissed
        // }
    }
    catch (e) {
        alert(e.message);
    }
};
const ArchiveScreen = (props) => {
    //const availablePosts = useSelector(state => state.posts.posts);
    //post = availablePosts.find(p => p.id == props.navigation.getParam('id'));
    const post = props.navigation.getParam('post');
    let doc = new DomParser().parseFromString(post.content.rendered, 'text/html');
    try {
        pdfUrl = doc.getElementsByAttribute('data-pdf')[0].getAttribute('data-pdf');
    }
    catch{
        console.log('Article does not contain a pdf link');
        return (<View><Text>No pdf in article</Text></View>);
    }

    if (!post) {
        props.navigation.navigate('Home');
        return (<View></View>);
    }
    return (
        <View style={styles.container}>
            <View style={styles.postContainer}>
                <View style={styles.postContent}>
                    <PdfReader webviewStyle customStyle={{
                        readerContainerZoomContainer: { display: 'none' },
                        readerContainerNavigateArrow: {
                        },
                        readerContainerDocument: {

                        },
                        readerContainerNavigate: {
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row-reverse'
                        }
                    }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} noLoader={false} useGoogleReader={true} withScroll={false} withPinchZoom={true} source={{ uri: pdfUrl }}></PdfReader>
                    {/* <WebView onLoadEnd={() => { console.log('end') }} onLoadProgress={() => { console.log('started') }} onLoadStart={() => { console.log(pdfUrl) }} style={{ flex: 1 }} source={{ uri: 'https://assafinaonline.com/subscription-form/' }}></WebView> */}
                </View>
            </View>
        </View>
    )

};

ArchiveScreen.navigationOptions = (navigationData) => {
    let navPost = navigationData.navigation.getParam('post');
    return {
        headerTitle: navigationData.navigation.getParam('title'),
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item onPress={() => { downloadPDFHandler(pdfUrl); }} title="Save" color="#fff" iconName={isPlatformAndroid() ? 'md-download' : 'ios-download'}></Item>
                    <Item onPress={() => { sharePostHandler(navPost); }} title="Share" color="#fff" iconName={isPlatformAndroid() ? 'md-share' : 'ios-share'}></Item>
                </HeaderButtons>
            );
        }
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: -56,
        justifyContent: 'flex-start',
        backgroundColor: '#fff' //'#525559'
    },
    postContainer: {
        flex: 1,
        //padding: 10,
    },
    postContent: {
        flex: 1,
        //height: 500
    },
    shareContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: -30,
        paddingRight: 20
    },
    shareButtonContainer: {
        width: 60,
        height: 60,
        elevation: 5,
        overflow: 'hidden',
        borderRadius: 60
    },
    shareButton: {
        padding: 10,
        backgroundColor: CustomColors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ArchiveScreen;