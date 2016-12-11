
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} = ReactNative;

import type { Action } from './types';
import navigateTo from './bottomNav';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

const SERVER_URL_USERS = 'http://localhost:3000/api'

export function userLoginSuccess(user):Action {
    return {
        type: USER_LOGIN_SUCCESS,
        user: user
    };
}

export function userLoginFailure():Action {
    return {
        type: USER_LOGIN_FAILURE
    };
}

export function loginUser(username, password) {
    return (dispatch) => {
        fetch(`http://192.168.1.241:3000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("succes: ", responseJson)
                dispatch(userLoginSuccess(responseJson))
                dispatch(navigateTo('home', 'loginPage'))
            })
            .catch((error) => {
                console.log("fail", error)
                Alert.alert(
                    'Login Fail',
                    'Username or Password Wrong',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(userLoginFailure())
            });
    }
}
