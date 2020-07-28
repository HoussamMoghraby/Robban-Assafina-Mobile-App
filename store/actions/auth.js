import { baseUrl } from "../../helpers/apiUtils";
import AsyncStorage from "@react-native-community/async-storage";
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const FETCH_USER_TOKEN = 'FETCH_USER_TOKEN';


export const fetchUserToken = () => {
    return async dispatch => {
        try {
            console.log('fetching token');
            //async code
            var savedToken = await AsyncStorage.getItem('userToken');
            console.log('saved Token:' + savedToken);
            dispatch({
                type: FETCH_USER_TOKEN, token: savedToken
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