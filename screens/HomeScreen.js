import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, Linking, Alert } from 'react-native';
import PostsList from '../components/PostsList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomColors from '../constants/CustomColors';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { isPlatformAndroid } from '../helpers/Platform';
import TouchableComponent from '../components/TouchableComponent';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
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
            var topSponsorsDOM = doc.getElementById('top-banner-wrapper').getElementsByTagName('a');
            var imagesList = [];
            imagesList = getSponsorsImages(topSponsorsDOM, 'top');
            setSponsorsList(imagesList);
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
                if (!savedToken) {
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
        //Background notification handler
        // const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
        //     console.log(response.notification.request.content.data);
        //     debugger;
        //     // try {
        //     if (response.notification.request.content.data && response.notification.request.content.data.postId) {
        //         //Alert.alert(response.notification.request.content.data.postId.toString());
        //         //props.navigation.push('Search');
        //         setTappedNotification(response.notification.request.content.data.postId);
        //         AsyncStorage.setItem('tapped', response.notification.request.content.data.postId.toString()).then(() => { });
        //     }
        //     // }
        //     // catch (e) {
        //     // console.error(e);
        //     // }
        //     console.log(response);
        // });

        //Foreground notification handler
        const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
            //debugger;
            if (notification.request.content.data && notification.request.content.data.postId) {
                //Alert.alert(notification.request.content.data.postId.toString());
            }
            console.log(notification);
        });

        return () => {
            //backgroundSubscription.remove();
            foregroundSubscription.remove();
        }
    }, []);

    // useEffect(() => {
    //     AsyncStorage.getItem('tapped').then((tt) => {
    //         console.log('Stored tapped: ' + tt);
    //         //Alert.alert('Stored tapped: ' + tt);
    //     });
    //     console.log('tapped notification: ' + tappedNotification);
    //     if (tappedNotification) {
    //         //props.navigation.push('Search');
    //     }
    // }, [tappedNotification]);


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
                                    <View style={{ ...styles.sponsorWrapper, ...{ maxWidth: `${(100 / sponsorsList.length).toString()}%` } }} key={sponsor.imageUrl}>
                                        <TouchableComponent onPress={() => { Linking.openURL(sponsor.link) }}>
                                            <ImageBackground style={styles.sponsorsImage} source={{
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
        flexDirection: 'row',
        justifyContent: 'flex-start',
        //elevation: 2,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        alignItems: 'flex-start',
        width: '100%'
    },
    sponsorWrapper: {
        width: '100%',
        //maxWidth: '50%'
    },
    sponsorsImage: {
        width: '100%',
        height: SPONSORS_IMAGE_HEIGHT,
        borderColor: '#eee',
        borderRightWidth: 1,
        borderLeftWidth: 1
    }
});

export default HomeScreen;