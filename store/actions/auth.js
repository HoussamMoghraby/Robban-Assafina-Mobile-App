import { baseUrl, sys_admin, apiUrl } from "../../helpers/apiUtils";
import AsyncStorage from "@react-native-community/async-storage";
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const FETCH_USER_TOKEN = 'FETCH_USER_TOKEN';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_USER = 'REGISTER_USER';

export const registerUser = (username, first_name, last_name, password) => {
    return async dispatch => {
        try {
            //get sys admin user token
            let loginUrl = `${baseUrl}wp-json/jwt-auth/v1/token`;
            console.log(`authenticating sys admin: ${sys_admin.username}:${sys_admin.password}`);
            const response = await fetch(loginUrl,
                {
                    method: 'POST',
                    body: JSON.stringify({ username: sys_admin.username, password: sys_admin.password }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
            const sysAdminRes = await response.json();
            if (sysAdminRes.code) {
                throw "COULD_NOT_AUTHENTICATE_SYS_ADMIN";
            }
            const sysAdminToken = sysAdminRes.token;
            //register user
            console.log('registering user');
            let registrationUrl = `${apiUrl}users`;
            const registrationResponse = await fetch(registrationUrl,
                {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            username: username,
                            first_name: first_name,
                            last_name: last_name,
                            email: username,
                            password: password
                        }
                    ),
                    headers: {
                        'Authorization': `Bearer ${sysAdminToken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
            const newUserResponse = await registrationResponse.json();
            if (newUserResponse.code) {
                throw 'COULD_NOT_CREATE_USER';
            }
            //retrieve results and autologin user
            console.log(`authenticating ${username}:${password}`);
            const loginFetch = await fetch(loginUrl,
                {
                    method: 'POST',
                    body: JSON.stringify({ username: username, password: password }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
            const loginResponse = await loginFetch.json();
            if (loginResponse.code)
                throw 'INVALID_CREDENTIALS';
            //Store results in localstorage
            await AsyncStorage.setItem('userToken', loginResponse.token);
            await AsyncStorage.setItem('userDisplayName', newUserResponse.name);
            await AsyncStorage.setItem('userEmail', username);

            //dispatch results to state
            dispatch({
                type: AUTHENTICATE_USER,
                token: loginResponse.token,
                email: username,
                displayName: newUserResponse.name
            })

        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        try {
            console.log('logging out');
            //async code
            await AsyncStorage.setItem('userToken', '');
            debugger;
            dispatch({
                type: LOGOUT_USER
            });
        }
        catch (error) {
            throw error;
        }
    }
}


export const fetchUserToken = () => {
    return async dispatch => {
        try {
            console.log('fetching token');
            //async code
            var savedToken = await AsyncStorage.getItem('userToken');
            var savedDisplayName = await AsyncStorage.getItem('userDisplayName');
            var savedEmail = await AsyncStorage.getItem('userEmail');
            console.log('saved Token:' + savedToken);
            //savedToken = null;
            dispatch({
                type: FETCH_USER_TOKEN,
                token: savedToken,
                email: savedEmail,
                displayName: savedDisplayName
            });
        }
        catch (error) {
            throw error;
        }
    }
}

export const authenticateUser = (userName, userPassword) => {
    return async dispatch => {
        try {
            //any async code
            debugger;
            let url = `${baseUrl}wp-json/jwt-auth/v1/token`;
            console.log(`authenticating ${userName}:${userPassword}`);
            const response = await fetch(url,
                {
                    method: 'POST',
                    body: JSON.stringify({ username: userName, password: userPassword }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
            var resData = await response.json();
            console.log(resData);
            if (resData.code) {
                throw 'invalid_credentials';
            }
            console.log(`authentication done`);
            await AsyncStorage.setItem('userToken', resData.token);
            await AsyncStorage.setItem('userDisplayName', resData.user_display_name);
            await AsyncStorage.setItem('userEmail', resData.user_email);

            //debugger;
            dispatch({
                type: AUTHENTICATE_USER,
                token: resData.token,
                email: resData.user_email,
                displayName: resData.user_display_name
            });
        } catch (error) {
            throw error;
        }
    }
}