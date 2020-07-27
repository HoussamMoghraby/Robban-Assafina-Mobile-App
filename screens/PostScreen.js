import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, ImageBackground, Dimensions, Linking, Share } from 'react-native';
import MyText from '../components/MyText';
import { ScrollView } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { isPlatformAndroid } from '../helpers/Platform';
import TouchableComponent from '../components/TouchableComponent';
import CustomColors from '../constants/CustomColors';
import WebView from 'react-native-webview';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/posts';
import { decodeString } from '../helpers/apiUtils';

const IMAGE_HEIGHT = 250;
let customHeaderComponent = (props) => {
    return (
        <CustomHeaderButton iconComponent={MaterialCommunityIcons} {...props} />
    )
};
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

let increaseFont;
let decreaseFont;
const PostScreen = (props) => {

    const [fontSize, setFontSize] = useState(16);

    increaseFont = () => {
        setFontSize(fs => (fs >= 24) ? 24 : fs + 2);
    };

    decreaseFont = () => {
        setFontSize(fs => (fs <= 16) ? 16 : fs - 2);
    };

    //const availablePosts = useSelector(state => state.posts.posts);
    //const post = availablePosts.find(p => p.id == props.navigation.getParam('id'));
    const post = props.navigation.getParam('post');
    if (!post) {
        props.navigation.navigate('Home');
        return (<View></View>);
    }

    const postMediaUrl = props.navigation.getParam('mediaUrl');
    const isPostFavorite = useSelector(state => state.posts.favoritePosts.some(p => p.id === post.id));

    const dispatch = useDispatch();
    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(post));
    }, [dispatch, post.id]);


    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
    }, [toggleFavoriteHandler]);

    useEffect(() => {
        props.navigation.setParams({ isFav: isPostFavorite });
    }, [isPostFavorite]);

    const fontSizeChangeHandler = useCallback((direction = 'up') => {
        if (direction == 'up')
            setFontSize(fs => (fs >= 24) ? 24 : fs + 2);
        else
            setFontSize(fs => (fs <= 16) ? 16 : fs - 2);
    }, [dispatch, post.id]);

    useEffect(() => {
        props.navigation.setParams({ fsHandler: fontSizeChangeHandler })
    }, [fontSizeChangeHandler]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.topContainer}>
                    <ImageBackground style={styles.imageBackground} source={postMediaUrl}>
                        <View style={styles.imageBackgroundOverlay}></View>
                    </ImageBackground>
                    <View style={styles.shareContainer}>
                        <View style={styles.shareButtonContainer}>
                            <TouchableComponent onPress={() => { sharePostHandler(post); }}>
                                <View style={styles.shareButton}>
                                    <Ionicons color='#fff' size={39} name={isPlatformAndroid() ? 'md-share' : 'ios-share'}></Ionicons>
                                </View>
                            </TouchableComponent>
                        </View>
                    </View>
                </View>
                <View style={styles.postContainer}>
                    <View style={styles.titleContainer}>
                        <MyText style={styles.dateText}>{new Date(post.date).toDateString()}</MyText>
                        <MyText bold={true} style={styles.titleText}>{decodeString(post.title.rendered.trim())}</MyText>
                    </View>
                    <View style={styles.postContent}>
                        <HTML key={fontSize}
                            alterNode={(node) => {
                                if (node.name === 'a' || node.name === 'p') {
                                    node.attribs = { ...(node.attribs || {}), style: `${node.attribs['style']}; font-size: ${fontSize} !important;` };
                                }
                            }}
                            //baseFontStyle={{ fontSize: fontSize }}
                            classesStyles={{ 'my-radix-node': { fontSize: fontSize } }}
                            //tagsStyles={{ a: { fontSize: fontSize }, p: { fontSize: fontSize } }}
                            renderers={{
                                iframe: (e) => {
                                    return (
                                        <TouchableComponent key={Math.random()} onPress={() => { Linking.openURL(e.src) }}>
                                            {e.src.includes('youtube') ?
                                                <View style={{ padding: 5, width: '100%', height: 150, backgroundColor: '#000', alignItems: 'center', justifyContent: 'flex-start', borderRadius: 5 }}>
                                                    <View>
                                                        <View>
                                                            <Text numberOfLines={1} style={{ fontSize: 16, color: '#fff' }}>{e.title}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                                        <FontAwesome5 name="youtube" size={40} color="#db4b3f" ></FontAwesome5>
                                                    </View>
                                                </View>
                                                : <View></View>
                                            }
                                        </TouchableComponent>
                                    )
                                }
                            }}
                            debug={false}
                            onLinkPress={(evt, href) => { Linking.openURL(href); }}
                            html={post.content.rendered}
                            imagesMaxWidth={Dimensions.get('window').width} />
                        {/*<WebView
                            // injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                            injectedJavaScript={`document.getElementsByTagName('html')[0].style.userSelect='none'`}
                            style={{ /*flex: 1, height:Dimensions.get('window').height /*height: 5000*/ /*}}
                            source={{ html: post.content.rendered }}
                            scalesPageToFit={false}></WebView>
                        */}
                    </View>
                </View>
            </ScrollView>
        </View>
    )

};

PostScreen.navigationOptions = (navigationData) => {
    const toggleFav = navigationData.navigation.getParam('toggleFav');
    const isFav = navigationData.navigation.getParam('isFav');
    const fsHandler = navigationData.navigation.getParam('fsHandler');
    return {
        headerTitle: '',// navigationData.navigation.getParam('title'),
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={customHeaderComponent}>
                    <Item onPress={() => { toggleFav(); }} title="Favorite" color={isFav ? "gold" : "#fff"} iconName="star"></Item>
                    <Item onPress={() => { fsHandler('down'); }} title="FontDecrease" color="#fff" iconName="format-font-size-decrease"></Item>
                    <Item onPress={() => { fsHandler('up'); }} title="FontIncrease" color="#fff" iconName="format-font-size-increase"></Item>
                </HeaderButtons>
            );
        }
        // headerStyle: {
        //     elevation: 0,
        //     backgroundColor: 'rgba(0,0,0,0.7)'
        // }
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: -56,
        justifyContent: 'flex-start',
        backgroundColor: '#fff'
    },
    topContainer: {
        justifyContent: 'flex-start'
    },
    imageBackground: {
        width: '100%',
        height: IMAGE_HEIGHT
    },
    imageBackgroundOverlay: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1
    },
    postContainer: {
        flex: 1,
        padding: 10
    },
    dateText: {
        fontSize: 16,
        color: '#aeaeae'
    },
    titleText: {
        fontSize: 25,
        color: '#454545'
    },
    postContent: {
        flex: 1
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

export default PostScreen;