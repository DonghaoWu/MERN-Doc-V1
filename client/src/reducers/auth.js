//*10.3 *11.3 *12.2 *13.2
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, USER_LOAD_FAIL,NO_TOKEN_IN_LOCAL_STORAGE, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            }
        case REGISTER_FAIL:
        case NO_TOKEN_IN_LOCAL_STORAGE:
        case USER_LOAD_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            }
        default:
            return state;
    }
}