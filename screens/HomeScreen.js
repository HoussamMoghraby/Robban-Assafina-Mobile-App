import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, Linking } from 'react-native';
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

const SPONSORS_IMAGE_HEIGHT = 70;
const HomeScreen = (props) => {
    //const pushToken = useSelector(state => state.auth.pushToken);
    const dispatch = useDispatch();

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


    useEffect(() => {
        //Background notification handler
        const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        //Foreground notification handler
        const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification);
        });

        return () => {
            backgroundSubscription.remove();
            foregroundSubscription.remove();
        }
    }, []);


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
            <TouchableComponent onPress={() => { Linking.openURL('https://www.musasino.biz/product/lax'); }}>
                <View style={styles.sponsorsContainer}>
                    <ImageBackground style={styles.sponsorsImage} source={{
                        uri: 'https://assafinaonline.com/wp-content/uploads/MUSASINO-BANNER.gif'
                    }}></ImageBackground>
                </View>
            </TouchableComponent>
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
        elevation: 2,
        borderTopColor: '#ccc'
    },
    sponsorsImage: {
        width: '100%',
        height: SPONSORS_IMAGE_HEIGHT
    }
});

export default HomeScreen;