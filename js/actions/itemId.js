
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    AsyncStorage
} = ReactNative;

import type { Action } from './types';

export const LOAD_ITEMS_BY_ID = 'LOAD_ITEMS_BY_ID'
export const LOAD_ITEMS_BY_ID_SUCCESS = 'LOAD_ITEMS_BY_ID_SUCCESS'
export const LOAD_ITEMS_BY_ID_FAILURE = 'LOAD_ITEMS_BY_ID_FAILURE'

import decode from 'jwt-decode'

const SERVER_URL_USERS = 'http://localhost:3000/api'


export function loadItemsById() {
    return {type: LOAD_ITEMS_BY_ID}
}

export function loadItemsSuccessById(itemId) {
    return {type: LOAD_ITEMS_BY_ID_SUCCESS, itemId: itemId}
}

export function loadItemsFailureById() {
    return {type: LOAD_ITEMS_BY_ID_FAILURE}
}

export function getItemsById(token, id) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>> dapet id nya: ", id)
    return (dispatch) => {
        dispatch(loadItemsById())
        fetch(`http://192.168.1.241:3000/api/items/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("dapet by id: ", responseJson)
                dispatch(loadItemsSuccessById(responseJson))
            })
            .catch((error) => {
                console.log("fail by id: ", error)
                Alert.alert(
                    'Load Items Fail',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(loadItemsFailureById())
            });
    }
}

