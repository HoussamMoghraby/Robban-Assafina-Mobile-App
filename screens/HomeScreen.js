import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, Linking, Alert, Dimensions, Vibration } from 'react-native';
import PostsList from '../components/PostsList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomColors from '../constants/CustomColors';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { isPlatformAndroid } from '../helpers/Platform';
import TouchableComponent from '../components/TouchableComponent';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { Notifications as LegacyNotifications } from 'expo';
import { useSelector, useDispatch } from 'react-redux';
import * as AuthActions from '../store/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
import * as PostsActions from '../store/actions/posts';
var DomParser = require('react-native-html-parser').DOMParser;

const getSponsorsImages = (dom, tag) => {
    let images = [];
    for (let i = 0; i < dom.length; i++) {
        let link = dom[i].getAttribute('href');
        let imageUrl = dom[i].getElementsByTagName('img')[0].getAttribute('src');
        let title = dom[i].getElementsByTagName('img')[0].getAttribute('title');
        images.push({ link: link, imageUrl: imageUrl, title: title, tag: tag });
    }
    return images;
}

const SPONSORS_IMAGE_HEIGHT = 70;
const HomeScreen = (props) => {
    //const pushToken = useSelector(state => state.auth.pushToken);
    const dispatch = useDispatch();
    const sponsorsHTML = useSelector(state => state.posts.sponsorsHtmlString);
    const notificationPost = useSelector(state => state.posts.notificationPost);
    //var notificationIsLoading = useSelector(state => state.posts.notificationIsLoading);
    const [sponsorsList, setSponsorsList] = useState([]);

    useEffect(() => {
        const fetchSponsors = async () => {
            try { await dispatch(PostsActions.fetchSponsorsHTML()); }
            catch (error) { console.log(error); }
        }
        fetchSponsors();
    }, [dispatch]);

    useEffect(() => {
        const setTopSponsorsList = () => {
            console.log('Setting Top Sponsors');
            var doc = new DomParser().parseFromString(sponsorsHTML, 'text/html');
            var topSponsorsDOM = doc.getElementById('top-banner-wrapper-mobile')?.getElementsByTagName('a');
            var imagesList = [];
            if (topSponsorsDOM) {
                imagesList = getSponsorsImages(topSponsorsDOM, 'top');
                setSponsorsList(imagesList);
                //setSponsorsList([]);
            }
        }
        if (sponsorsHTML)
            setTopSponsorsList();
    }, [dispatch, sponsorsHTML])

    // useEffect(() => {
    //     const getSavedToken = async () => {
    //         await dispatch(AuthActions.fetchPushToken());
    //     };
    //     getSavedToken();
    // }, [dispatch]);

    useEffect(() => {
        Permissions.getAsync(Permissions.NOTIFICATIONS).then((statusObj) => {
            if (statusObj.status !== 'granted') {
                return Permissions.askAsync(Permissions.NOTIFICATIONS);
            }
            return statusObj;
        }).then((statusObj) => {
            if (statusObj.status !== 'granted') {
                throw new Error("Permission not granted");
            }
        }).then(() => {
            console.log('Getting push token');
            // register push token and save it locally if pushToken is null
            //if (!pushToken) {
            //AsyncStorage.setItem('pushToken', '').then(ss => { });
            return AsyncStorage.getItem('pushToken').then(savedToken => {
                console.log('saved token :' + savedToken);
                if (!savedToken || (savedToken && !savedToken.startsWith('Expo'))) {
                    Notifications.getExpoPushTokenAsync()
                        .then(response => {
                            if (response) {
                                dispatch(AuthActions.registerPushToken(response.data))
                                    .then(c => {
                                        //Alert.alert(response.data);
                                        console.log(c);
                                    })
                                    .catch(error => { console.log(error); })
                            }
                        })
                        .catch(error => {
                            dispatch(AuthActions.registerPushToken(error.toString()))
                                .then(c => {
                                    console.log(c);
                                })
                        })
                }
                return savedToken;
            }).
                catch((err) => {
                    console.log(err);
                });
            //}
        }).then(response => {
            const token = response;
            //ExponentPushToken[ZR3VtsNxwQZZizhEoDZlgY]
            console.log(token);
        })
            .catch((err) => {
                console.log(err);
                return null;
            })
    }, [dispatch]);


    //const [tappedNotification, setTappedNotification] = useState();
    useEffect(() => {
        // AsyncStorage.getItem('notificationClicked').then(response => {
        //     let ress = JSON.parse(response);
        //     debugger;
        //     if (ress.notification.request.content.data && ress.notification.request.content.data.postId && ress.notification.request.content.data.postId != 1) {
        //         dispatch(PostsActions.setNotificationPostLoader(true));
        //         dispatch(PostsActions.getPostById(ress.notification.request.content.data.postId));
        //     }
        // }).then(() => {
        //     AsyncStorage.removeItem('notificationClicked').then(() => { }).catch(() => { });
        // });

        //handle background notification selection
        AsyncStorage.getItem('notificationPost').then((notif) => {
            debugger;
            if (notif) {
                console.log(notif);
                const notificationMessage = JSON.parse(notif);
                if (notificationMessage.postId && notificationMessage.postId.toString() != "1") {
                    dispatch(PostsActions.setNotificationPostLoader(true));
                    dispatch(PostsActions.getPostById(notificationMessage.postId));
                }
            }
        }).then(() => {
            AsyncStorage.setItem('notificationPost', '').then(() => { }).catch((e) => { console.warn(e); });
        })
            .catch((e) => { console.warn(e); })

        const notifListener = LegacyNotifications.addListener((notification) => {
            console.log('HOME: old notification received');
            console.log(notification);
            // if (notification && notification.origin && notification.origin == "received")
            //     Vibration.vibrate();
            if (notification && notification.origin && notification.origin == "selected" && notification.data && notification.data.postId.toString() != "1") {
                debugger;
                dispatch(PostsActions.setNotificationPostLoader(true));
                dispatch(PostsActions.getPostById(notification.data.postId));
            }
            //console.log('Old notification receivedd');
        });
        // const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
        //     console.log('HOME: notification received');
        //     console.log(response.notification.request.content.data);
        //     try {
        //         if (response.notification.request.content.data && response.notification.request.content.data.postId && response.notification.request.content.data.postId != 1) {
        //             //             //AsyncStorage.setItem('tappedNotificationPostId', response.notification.request.content.data.postId.toString()).then(() => { });
        //             //             //Alert.alert(`tappedNotificationPostId: ${response.notification.request.content.data.postId}`);
        //             //             //props.navigation.push('Search');
        //             //             //props.navigation.push(routeName, { id: id, title: title, mediaUrl: mediaUrl, post: post });
        //             //             //notificationIsLoading = true;

        //             //disabled opening notification post
        //             dispatch(PostsActions.setNotificationPostLoader(true));
        //             dispatch(PostsActions.getPostById(response.notification.request.content.data.postId));
        //         }
        //     }
        //     catch (e) {
        //         console.error(e);
        //     }
        // });
        //Foreground notification handler
        // const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
        //     //debugger;
        //     if (notification.request.content.data && notification.request.content.data.postId) {
        //         //Alert.alert(notification.request.content.data.postId.toString());
        //     }
        //     console.log('foregroundSubscription: ' + notification);
        // });

        return () => {
            //backgroundSubscription.remove();
            notifListener.remove();
            //foregroundSubscription.remove();
        }
    }, [dispatch]);


    const getPostMediaUrl = useCallback((post) => {
        if (post && post['_embedded']['wp:featuredmedia'] && post['_embedded']['wp:featuredmedia'].length > 0) {
            var mediaUrl = post['_embedded']['wp:featuredmedia'][0].source_url;
            if (mediaUrl)
                return { uri: mediaUrl };
            return require(`../assets/placeholder.png`);
        }
        return require(`../assets/placeholder.png`);
    }, [notificationPost]);

    useEffect(() => {
        debugger;
        if (notificationPost && !notificationPost.opened) {
            console.log('navigate to post:' + notificationPost.id);
            notificationPost.opened = true;
            props.navigation.push('Post', { id: notificationPost.id, title: notificationPost.title, mediaUrl: getPostMediaUrl(notificationPost), post: notificationPost });
        }
    }, [notificationPost]);

    // useEffect(() => {
    //     AsyncStorage.getItem('tappedNotificationPostId').then((tnpId) => {
    //         if (tnpId && tnpId != '') {
    //             console.log('tappedNotificationPostId:' + tnpId);
    //             Alert.alert(tnpId);
    //         }
    //     }).then(() => {
    //         AsyncStorage.setItem('tappedNotificationPostId', '').then(() => {
    //             console.log('Cleared tappedNotificationPostId');
    //         });
    //     }).catch((error) => { console.error(error); });
    //     //console.log('tapped notification: ' + tappedNotification);
    //     // if (tappedNotification) {
    //     //     //props.navigation.push('Search');
    //     // }
    // }, []);


    const [scrollToTop, setScrollToTop] = useState([]);
    const logoClickHandler = useCallback(() => {
        setScrollToTop(stt => stt.concat(1));
    }, [scrollToTop]);

    useEffect(() => {
        props.navigation.setParams({ scrollHandler: logoClickHandler });
    }, [logoClickHandler]);

    return (
        <View style={styles.screen}>
            <PostsList {...props} showBetweenPostsSponsors={true} scrollToTop={scrollToTop}></PostsList>
            {
                (sponsorsList && sponsorsList.length > 0) ?
                    <View style={{ width: '100%', backgroundColor: '#eee' }}>
                        <View style={styles.sponsorsContainer}>
                            {
                                sponsorsList.map(sponsor => (
                                    <View style={{ ...styles.sponsorWrapper, ...{ maxWidth: `${(100/* / sponsorsList.length*/).toString()}%` } }} key={sponsor.imageUrl}>
                                        <TouchableComponent onPress={() => { Linking.openURL(sponsor.link) }}>
                                            <ImageBackground style={{ ...styles.sponsorsImage, ...{ height: SPONSORS_IMAGE_HEIGHT / 1 } }} source={{
                                                uri: sponsor.imageUrl
                                            }} resizeMode="contain"></ImageBackground>
                                        </TouchableComponent>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                    : <View></View>
            }
        </View >
    )
};


HomeScreen.navigationOptions = (navigationData) => {
    const scrollHandler = navigationData.navigation.getParam('scrollHandler');
    return {
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item onPress={() => { navigationData.navigation.push('Search') }} style={{ backgroundColor: '#eaeaea', borderRadius: 50, height: 40, width: 40, marginLeft: 5 }} title="Search" color={CustomColors.primaryColor} iconName={isPlatformAndroid() ? 'md-search' : 'ios-search'}></Item>
                </HeaderButtons>
            )
        },
        headerRight: () => {
            return (
                <TouchableComponent onPress={() => { scrollHandler(); }}>
                    <View style={{ padding: 5, flex: 1 }}>
                        <Image style={{ width: isPlatformAndroid() ? 120 : 100, height: isPlatformAndroid() ? 45 : 35 }} source={require('../assets/logo.png')}></Image>
                    </View>
                </TouchableComponent>
            )
        }
    }
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    sponsorsContainer: {
        //flexDirection: 'row',
        justifyContent: 'flex-start',
        //elevation: 2,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        //alignItems: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },
    sponsorWrapper: {
        width: '100%',
        //maxWidth: '50%'
    },
    sponsorsImage: {
        width: '100%',
        //maxHeight: SPONSORS_IMAGE_HEIGHT,
        borderColor: '#eee',
        borderRightWidth: 1,
        borderLeftWidth: 1
    }
});

export default HomeScreen;