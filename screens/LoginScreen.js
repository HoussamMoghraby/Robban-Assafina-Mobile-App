import React from 'react';
import { View, StyleSheet, TextInput, Keyboard } from 'react-native';
import CustomColors from '../constants/CustomColors';
import MyText from '../components/MyText';
import TouchableComponent from '../components/TouchableComponent';

const LoginScreen = (props) => {
    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
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
                        style={styles.input}></TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
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
                        style={styles.input}></TextInput>
                </View>

                <View>
                    <TouchableComponent style={styles.loginButton} onPress={() => { props.navigation.navigate('Archives') }}>
                        <View>
                            <MyText bold={true} style={styles.loginButtonText}>LOGIN</MyText>
                        </View>
                    </TouchableComponent>
                </View>
                <View style={styles.signupButtonContainer}>
                    <TouchableComponent style={styles.signupButton}>
                        <View>
                            <MyText style={styles.signupButtonText}>New here? Create account.</MyText>
                        </View>
                    </TouchableComponent>
                </View>

            </View>
        </View>
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