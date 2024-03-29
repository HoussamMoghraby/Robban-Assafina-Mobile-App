import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, Linking, Alert } from 'react-native';
import MyText from '../components/MyText';
import CustomColors from '../constants/CustomColors';
import TouchableComponent from '../components/TouchableComponent';
import { Ionicons } from '@expo/vector-icons';
import { isPlatformAndroid } from '../helpers/Platform';
import { useSelector, useDispatch } from 'react-redux';
import * as AuthActions from '../store/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
//const isLoggedIn = true;

const BUTTON_ICON_SIZE = 19;
const MoreScreen = (props) => {
    const [pushToken, setPushToken] = useState();
    const userToken = useSelector(state => state.auth.token);
    const userDisplayName = useSelector(state => state.auth.displayName);

    const dispatch = useDispatch();
    const handleLogout = useCallback(() => {
        console.log('Logout');
        const logout = async () => {
            await dispatch(AuthActions.logoutUser());
        }
        Alert.alert(
            'Are you sure you want to logout?',
            '',
            [
                {
                    text: 'No',
                    onPress: () => { console.log('no') }
                },
                {
                    text: 'Yes',
                    onPress: () => { console.log('yes'); logout(); }
                }

            ]
        )
    }, [userToken, dispatch]);

    const handleLinkClick = useCallback((title, url) => {
        // if (isPlatformAndroid()) {
        props.navigation.push('Webpage', { title: title, url: url });
        // }
        // else
        //     Linking.openURL(url)
    }, [userToken, dispatch]);

    useEffect(() => {
        const getUserToken = async () => {
            try {
                await dispatch(AuthActions.fetchUserToken());
                //setTokenFetched(true);
                //debugger;
            }
            catch (error) {
                console.log(error);
            }
        }
        getUserToken();
    }, [dispatch]);

    useEffect(() => {
        const getPushToken = async () => {
            try {
                let token = await AsyncStorage.getItem('pushToken');
                setPushToken(token);
            }
            catch (error) {
                console.log(error);
            }
        }
        getPushToken();
    }, [dispatch]);

    // if (isLoggedIn) {
    return (
        <View style={styles.screen}>
            <ScrollView style={{ flex: 1, width: '100%' }} >
                {
                    userToken ?
                        <View style={styles.topSection}>
                            <View style={styles.userSection}>
                                <View style={styles.userImageContainer}>
                                    <Image style={styles.userImage} source={/*require('../assets/user_image.png')*/ require('../assets/user_image.png')} ></Image>
                                </View>
                                <View style={styles.userInfo}>
                                    <MyText bold={true} style={styles.usernameText}>{userDisplayName}</MyText>
                                </View>
                            </View>
                        </View>
                        : <View></View>
                }
                <View style={styles.buttons}>
                    <TouchableComponent onPress={() => { handleLinkClick('Contact Us', 'https://assafinaonline.com/contact-us-mobile/') }}>
                        <View style={styles.button}>
                            <View>
                                <MyText style={styles.buttonText} bold={false}>Contact Us</MyText>
                            </View>
                            <View>
                                <Ionicons style={styles.buttonIcon} size={BUTTON_ICON_SIZE} color={CustomColors.primaryColor} name="ios-arrow-forward"></Ionicons>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent onPress={() => { handleLinkClick('About Us', 'https://assafinaonline.com/about-us-2/') }}>
                        <View style={styles.button}>
                            <View>
                                <MyText style={styles.buttonText} bold={false}>About Us</MyText>
                            </View>
                            <View>
                                <Ionicons style={styles.buttonIcon} size={BUTTON_ICON_SIZE} color={CustomColors.primaryColor} name="ios-arrow-forward"></Ionicons>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent onPress={() => { handleLinkClick('Subscribe With Us', 'https://assafinaonline.com/subscription-form-mobile/') }}>
                        <View style={styles.button}>
                            <View>
                                <MyText style={styles.buttonText} bold={false}>Subscribe With Us</MyText>
                            </View>
                            <View>
                                <Ionicons style={styles.buttonIcon} size={BUTTON_ICON_SIZE} color={CustomColors.primaryColor} name="ios-arrow-forward"></Ionicons>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent onPress={() => { handleLinkClick('Join Our Newsletter', 'https://assafinaonline.com/join-our-newsletter-mobile/') }}>
                        <View style={styles.button}>
                            <View>
                                <MyText style={styles.buttonText} bold={false}>Join Our Newsletter</MyText>
                            </View>
                            <View>
                                <Ionicons style={styles.buttonIcon} size={BUTTON_ICON_SIZE} color={CustomColors.primaryColor} name="ios-arrow-forward"></Ionicons>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent onPress={() => { Alert.alert('Facing issues with the app?', `Take a screenshot of this alert and send it to us by email so we can investigate it further.\n\nUsername: ${userDisplayName ? userDisplayName : 'NONE'}\nNotification Token: ${pushToken}\n`) }}>
                        <View style={styles.button}>
                            <View>
                                <MyText style={styles.buttonText} bold={false}>Support</MyText>
                            </View>
                            <View>
                                <Ionicons style={styles.buttonIcon} size={BUTTON_ICON_SIZE} color={CustomColors.primaryColor} name="ios-arrow-forward"></Ionicons>
                            </View>
                        </View>
                    </TouchableComponent>
                    {
                        userToken ?
                            <TouchableComponent onPress={() => { handleLogout() }}>
                                <View style={styles.button}>
                                    <View>
                                        <MyText style={{ ...styles.buttonText, ...{ color: 'red' } }} bold={false}>Logout</MyText>
                                    </View>
                                    <View>
                                        <Ionicons style={styles.buttonIcon} size={BUTTON_ICON_SIZE} color="red" name={isPlatformAndroid ? 'md-log-out' : 'ios-log-out'}></Ionicons>
                                    </View>
                                </View>
                            </TouchableComponent>

                            : <View></View>
                    }
                </View>
            </ScrollView>
            <View style={styles.appDev}>
                <View>
                    <MyText style={{ fontSize: 10 }}>App Designed & Developed by</MyText>
                </View>
                <TouchableComponent onPress={() => { Linking.openURL('http://www.radixsarl.com'); }}>
                    <View>
                        <MyText bold={true} style={{ fontSize: 10 }}>RADIX S.A.R.L</MyText>
                    </View>
                </TouchableComponent>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }} >
                <MyText style={{ fontSize: 5 }}>App Version: 1.0.0.2</MyText>
            </View>
        </View >
    )
    // }
    // else {
    //     return (
    //         <View><Text>Not Logged in</Text></View>
    //     )
    // }
};


MoreScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'More from Robban Assafina'
    }
};

const styles = StyleSheet.create({
    screen: {
        //justifyContent: 'center',
        //alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff'
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eee',
        elevation: 2
    },
    userSection: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    userImageContainer: {
        borderRadius: 80,
        overflow: 'hidden',
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: CustomColors.primaryColor
    },
    userImage: {
        width: '100%',
        height: '100%'
    },
    userInfo: {
        paddingHorizontal: 10
    },
    usernameText: {
        fontSize: 17,
        color: CustomColors.primaryColor
    },
    buttons: {
        margin: 10,
        flex: 1
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    buttonText: {
        fontSize: 19
    },
    appDev: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3
    }

});

export default MoreScreen;