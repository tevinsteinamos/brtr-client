
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    AsyncStorage
} = ReactNative;

import type { Action } from './types';

export const LOAD_ITEMS_BY_USER = 'LOAD_ITEMS_BY_USER'
export const LOAD_ITEMS_BY_USER_SUCCESS = 'LOAD_ITEMS_BY_USER_SUCCESS'
export const LOAD_ITEMS_BY_USER_FAILURE = 'LOAD_ITEMS_BY_USER_FAILURE'

import decode from 'jwt-decode'

const SERVER_URL_USERS = 'http://localhost:3000/api'

export function loadItems() {
    return {type: LOAD_ITEMS_BY_USER}
}

export function loadItemsSuccess(items) {
    return {type: LOAD_ITEMS_BY_USER_SUCCESS, items: items}
}

export function loadItemsFailure() {
    return {type: LOAD_ITEMS_BY_USER_FAILURE}
}

export function getItems(token) {
    console.log("masuk get item: ", token)
    const UserData = decode(token)
    return (dispatch) => {
        dispatch(loadItems())
        fetch(`http://192.168.1.241:3000/api/items/user/${UserData.id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("ini respon item: ", responseJson)
                dispatch(loadItemsSuccess(responseJson))
            })
            .catch((error) => {
                console.log("fail: ", error)
                Alert.alert(
                    'Load Items Fail',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(loadItemsFailure())
            });
    }
}

