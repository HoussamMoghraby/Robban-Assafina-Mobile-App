import { AUTHENTICATE_USER, FETCH_USER_TOKEN, LOGOUT_USER, FETCH_PUSH_TOKEN } from '../actions/auth';

export const initialState = {
    token: null,
    email: null,
    displayName: null,
    pushToken: null
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PUSH_TOKEN:
            return {
                ...state,
                pushToken: action.pushToken
            }
        case LOGOUT_USER:
            return {
                ...state,
                token: null,
                email: null,
                displayName: null
            };
        case FETCH_USER_TOKEN:
            return {
                ...state,
                token: action.token,
                email: action.email,
                displayName: action.displayName
            };
        case AUTHENTICATE_USER:
            return {
                ...state,
                token: action.token,
                email: action.email,
                displayName: action.displayName
            };
        default:
            return state;
    }
}

export default authReducer;