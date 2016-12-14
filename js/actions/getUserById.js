
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    AsyncStorage
} = ReactNative;

import type { Action } from './types';

export const LOAD_USER_BY_ID = 'LOAD_USER_BY_ID'
export const LOAD_USER_BY_ID_SUCCESS = 'LOAD_USER_BY_ID_SUCCESS'
export const LOAD_USER_BY_ID_FAILURE = 'LOAD_USER_BY_ID_FAILURE'

import decode from 'jwt-decode'


export function loadUserById() {
    return {type: LOAD_USER_BY_ID}
}

export function loadUserSuccessById(user) {
    return {type: LOAD_USER_BY_ID_SUCCESS, user: user}
}

export function loadUserFailureById() {
    return {type: LOAD_USER_BY_ID_FAILURE}
}

export function getUserById(token) {
    const userDecoded = decode(token)
    console.log("user id >>>>>>>>>>> ", userDecoded)
    return (dispatch) => {
        dispatch(loadUserById())
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/auth/user/${userDecoded.id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("res user: ", responseJson)
                dispatch(loadUserSuccessById(responseJson))
            })
            .catch((error) => {
                console.log("fail by id: ", error)
                Alert.alert(
                    'Load User Fail',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(loadUserFailureById())
            });
    }
}