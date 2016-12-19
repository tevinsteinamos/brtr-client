
var React = require('react');
var ReactNative = require('react-native');
var {
    AsyncStorage
} = ReactNative;

import type { Action } from './types';
import decode from 'jwt-decode'

export const GET_TOKEN = 'GET_TOKEN'
export const REMOVE_TOKEN = 'REMOVE_TOKEN'
export const LOGOUT_USER = 'LOGOUT_USER'

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

const SERVER_URL_USERS = 'http://localhost:3000/api'


export async function getToken() {
    try {
        let token = await AsyncStorage.getItem("myKey");
        let dataUser = decode(token)
        return {type: GET_TOKEN, token, dataUser}
    } catch (error) {

    }
}

export function userRegisterSuccess(user):Action {
    return {
        type: USER_REGISTER_SUCCESS,
        user: user
    };
}

export function userRegisterFailure():Action {
    return {
        type: USER_REGISTER_FAILURE,
        status: false
    };
}

export function registerUser(username, password, email, confirmPassword, navigator) {
    return (dispatch) => {
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/auth/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                confirmPassword: confirmPassword
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.name == "SequelizeValidationError") {
                    dispatch(userRegisterFailure())
                } else {
                    dispatch(userRegisterSuccess(responseJson))
                    AsyncStorage.setItem('myKey', responseJson);
                    navigator.replace({id: 'home'})
                }
            })
            .catch((error) => {
                Alert.alert(
                    'Register Fail',
                    'Username or Password has been used',
                    [
                        {text: 'OK'},
                    ]
                )
                dispatch(userRegisterFailure())
                navigator.replace({id: 'loginPage'})
            });
    }
}
export function userLoginNormalize() {
    return {
        type: USER_LOGIN
    };
}

export function userLoginSuccess(user):Action {
    return {
        type: USER_LOGIN_SUCCESS,
        user: user
    };
}

export function userLoginFailure():Action {
    return {
        type: USER_LOGIN_FAILURE,
        user: false
    };
}

export function removeToken() {
    return {
        type: GET_TOKEN,
        token: token
    };
}

export async function logoutUser() {
    try {
        await AsyncStorage.removeItem("myKey");
        return {
            type: LOGOUT_USER
        };
    } catch (error) {

    }
}



export function loginUser(username, password, navigator) {
    return (dispatch) => {
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson) {
                    // dispatch(userLoginSuccess(responseJson))
                    AsyncStorage.setItem('myKey', responseJson);
                    dispatch(getToken())
                }
            })
            .catch((error) => {
                if (error == 'SyntaxError: Unexpected token U in JSON at position 0(…)') {
                    dispatch(userLoginFailure())
                } else {
                    dispatch(userLoginFailure())
                }
            });
    }
}
