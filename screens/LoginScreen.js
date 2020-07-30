import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import CustomColors from '../constants/CustomColors';
import MyText from '../components/MyText';
import TouchableComponent from '../components/TouchableComponent';
import { useSelector, useDispatch } from 'react-redux';
import * as AuthActions from '../store/actions/auth';
import * as Notifications from 'expo-notifications';

const LoginScreen = (props) => {

    const scheduleLocalNotification = /*useCallback(*/() => {
        console.log('Schedule welcome notification');
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Welcome to Robban Assafina Magazine',
                body: 'Click here to see all our archives'
            },
            trigger: {
                seconds: 10
            }
        });
    }/*, [dispatch])*/

    const [userNameInput, setUsernameInput] = useState('houssammoghraby@gmail.com');
    const [passwordInput, setPasswordInput] = useState('myp@ss@WS123');
    const [isLoading, setIsLoading] = useState();
    const [errorText, setErrorText] = useState(null);
    const dispatch = useDispatch();
    const authenticateUser = useCallback(() => {
        debugger;
        const authenticate = async () => {
            try {
                setIsLoading(true);
                await dispatch(AuthActions.authenticateUser(userNameInput, passwordInput));
                setErrorText(null);
                scheduleLocalNotification();
                props.navigation.replace('Archives');
            }
            catch (error) {
                console.info(error);
                setErrorText('Invalid credentials! please try again');
            }
            finally {
                setIsLoading(false);
                //setErrorText(null);
            }
        }
        if (!isLoading)
            authenticate();
    }, [dispatch, userNameInput, passwordInput, isLoading, errorText]);

    const usernameInputHandler = (input) => {
        setUsernameInput(input);
    }

    const passwordInputHandler = (input) => {
        setPasswordInput(input);
    }

    return (
        <View style={styles.screen}>
            <View style={{ marginBottom: 10 }}>
                <MyText style={{ color: 'red', fontSize: 16 }}>{errorText}</MyText>
            </View>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={usernameInputHandler}
                        value={userNameInput}
                        onSubmitEditing={(e) => { }}
                        blurOnSubmit={true}
                        onBlur={() => { /*Keyboard.dismiss();*/ }}
                        theme={{ colors: { primary: CustomColors.primaryColor, underlineColorAndroid: 'whitesmoke' } }} selectionColor="#ccc"
                        underlineColorAndroid="whitesmoke"
                        selectTextOnFocus={true}
                        caretHidden={false}
                        autoFocus={false}
                        autoCompleteType="off"
                        autoCorrect={false}
                        numberOfLines={1}
                        placeholder="Email / Username"
                        style={{ ...styles.input, ...(errorText ? styles.invalidInput : '') }}></TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={passwordInputHandler}
                        value={passwordInput}
                        secureTextEntry={true}
                        textContentType="password"
                        onSubmitEditing={(e) => { }}
                        blurOnSubmit={true}
                        onBlur={() => { /*Keyboard.dismiss();*/ }}
                        theme={{ colors: { primary: CustomColors.primaryColor, underlineColorAndroid: 'whitesmoke' } }} selectionColor="#ccc"
                        underlineColorAndroid="whitesmoke"
                        selectTextOnFocus={true}
                        caretHidden={false}
                        autoFocus={false}
                        autoCompleteType="off"
                        autoCorrect={false}
                        numberOfLines={1}
                        placeholder="Password"
                        style={{ ...styles.input, ...(errorText ? styles.invalidInput : '') }}></TextInput>
                </View>

                <View>
                    <TouchableComponent style={styles.loginButton} onPress={() => { authenticateUser(); /*scheduleLocalNotification();*/ }}>
                        <View>
                            {
                                !isLoading ?
                                    <MyText bold={true} style={styles.loginButtonText}>LOGIN</MyText> :
                                    <View>
                                        <ActivityIndicator size="small" color="#fff"></ActivityIndicator>
                                    </View>
                            }

                        </View>
                    </TouchableComponent>
                </View>
                <View style={styles.signupButtonContainer}>
                    <TouchableComponent style={styles.signupButton} onPress={() => { props.navigation.push('Signup'); }}>
                        <View>
                            <MyText style={styles.signupButtonText}>New here? Create account.</MyText>
                        </View>
                    </TouchableComponent>
                </View>

            </View>
        </View >
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 20
    },
    container: {
        width: '100%'
    },
    inputContainer: {
        marginBottom: 30
    },
    input: {
        borderWidth: 1,
        borderColor: '#eaeaea',
        fontSize: 18,
        padding: 10,
        backgroundColor: 'whitesmoke',
        borderRadius: 10,
        color: CustomColors.primaryColor,
        height: 60
    },
    invalidInput: {
        borderWidth: 1,
        borderColor: 'red'
    },
    loginButton: {
        borderRadius: 10,
        overflow: 'hidden',
        fontFamily: 'open-sans-bold',
        backgroundColor: CustomColors.accentColor,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonText: {
        fontSize: 19,
        color: '#fff'
    },
    signupButtonContainer: {
        marginTop: 20,
    },
    signupButton: {
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    signupButtonText: {
        fontSize: 16
    }
});

export default LoginScreen;