import { AUTHENTICATE_USER, FETCH_USER_TOKEN } from '../actions/auth';

export const initialState = {
    token: null,
    email: null,
    displayName: null
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_TOKEN:
            return {
                ...state,
                token: action.token
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