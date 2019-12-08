//*10.4 *11.4 *12.3 *13.3
import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, USER_LOAD_FAIL, NO_TOKEN_IN_LOCAL_STORAGE } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

//Load user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        /*
            when token is in localStorage, 
            update it in axio header whenever 
            you call this function.
        */
        setAuthToken(localStorage.token);

        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            })
        } catch (error) {
            dispatch({
                type: USER_LOAD_FAIL
            })
        }
    }
    else {
        setAuthToken(localStorage.token);
        dispatch({
            type: NO_TOKEN_IN_LOCAL_STORAGE
        })
    }
}

//Register user
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({
        name: name,
        email: email,
        password: password,
    })

    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        })

        //loadUser()错误;
        dispatch(loadUser());

    } catch (error) {
        //---./routes/users.js line 23
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
            ))
        }
        dispatch({
            type: REGISTER_FAIL,
        })
    }
}

//Login user
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({
        email: email,
        password: password,
    })

    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        })

        //loadUser()错误;
        dispatch(loadUser());

    } catch (error) {
        //---./routes/users.js line 23
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
            ))
        }
        dispatch({
            type: LOGIN_FAIL,
        })
    }
}

//Logout
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT,
    })
    setAuthToken(localStorage.token);
}

