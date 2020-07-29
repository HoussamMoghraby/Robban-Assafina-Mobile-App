import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import CustomColors from '../constants/CustomColors';
import MyText from '../components/MyText';
import TouchableComponent from '../components/TouchableComponent';
import { useSelector, useDispatch } from 'react-redux';
import * as AuthActions from '../store/actions/auth';
import { ScrollView } from 'react-native-gesture-handler';

const SignupScreen = (props) => {
    //Inputs
    const [userNameInput, setUsernameInput] = useState();
    const [firstNameInput, setFirstNameInput] = useState();
    const [lastNameInput, setLastNameInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    //

    const [isLoading, setIsLoading] = useState();
    const [errorText, setErrorText] = useState(null);
    const dispatch = useDispatch();

    const registerUserHandler = useCallback(() => {
        debugger;
        const registerUser = async () => {
            console.log(`${userNameInput} ${firstNameInput} ${lastNameInput} ${passwordInput}`);
            try {
                setIsLoading(true);
                await dispatch(AuthActions.registerUser(userNameInput, firstNameInput, lastNameInput, passwordInput));
                setIsLoading(false);
                setErrorText(null);
                props.navigation.replace('Archives');
            }
            catch (error) {
                setErrorText('Coult not register user. please contact admin');
                setIsLoading(false);
            }
        }
        if (!isLoading)
            registerUser();
    }, [/*dispatch,*/ userNameInput, passwordInput, firstNameInput, lastNameInput, isLoading, errorText]);

    const usernameInputHandler = (input) => {
        setUsernameInput(input);
    }
    const firstnameInputHandler = (input) => {
        setFirstNameInput(input);
    }
    const lastnameInputHandler = (input) => {
        setLastNameInput(input);
    }

    const passwordInputHandler = (input) => {
        setPasswordInput(input);
    }

    return (
        <ScrollView style={{ width: '100%', flex: 1 }}>
            <View style={styles.screen}>
                <View style={{ marginBottom: 10 }}>
                    <MyText style={{ color: 'red', fontSize: 16 }}>{errorText}</MyText>
                </View>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={firstnameInputHandler}
                            value={firstNameInput}
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
                            placeholder="First Name"
                            style={{ ...styles.input, ...(errorText ? styles.invalidInput : '') }}></TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={lastnameInputHandler}
                            value={lastNameInput}
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
                            placeholder="Last Name"
                            style={{ ...styles.input, ...(errorText ? styles.invalidInput : '') }}></TextInput>
                    </View>
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
                        <TouchableComponent style={styles.loginButton} onPress={() => { registerUserHandler() }}>
                            <View>
                                {
                                    !isLoading ?
                                        <MyText bold={true} style={styles.loginButtonText}>Create Account</MyText> :
                                        <View>
                                            <ActivityIndicator size="small" color="#fff"></ActivityIndicator>
                                        </View>
                                }

                            </View>
                        </TouchableComponent>
                    </View>
                </View>
            </View >
        </ScrollView>
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
    }
});

export default SignupScreen;