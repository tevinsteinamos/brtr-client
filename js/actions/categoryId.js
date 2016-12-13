
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    AsyncStorage
} = ReactNative;

import navigateTo from './bottomNav';

import type { Action } from './types';

export const LOAD_ITEMS_BY_CATEGORY_ID = 'LOAD_ITEMS_BY_CATEGORY_ID'
export const LOAD_ITEMS_BY_CATEGORY_ID_SUCCESS = 'LOAD_ITEMS_BY_CATEGORY_ID_SUCCESS'
export const LOAD_ITEMS_BY_CATEGORY_ID_FAILURE = 'LOAD_ITEMS_BY_CATEGORY_ID_FAILURE'

import decode from 'jwt-decode'

const SERVER_URL_USERS = 'http://localhost:3000/api'

export function loadItemsByCategoryId() {
    return {type: LOAD_ITEMS_BY_CATEGORY_ID}
}

export function loadItemsSuccessByCategoryId(items) {
    return {type: LOAD_ITEMS_BY_CATEGORY_ID_SUCCESS, items: items}
}

export function loadItemsFailureByCategoryId() {
    return {type: LOAD_ITEMS_BY_CATEGORY_ID_FAILURE}
}

export function getItemsByCategoryId(token, id) {
    return (dispatch) => {
        dispatch(loadItemsByCategoryId())
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/categories/${id}`, {
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
                dispatch(loadItemsSuccessByCategoryId(responseJson))
            })
            .catch((error) => {
                console.log("fail by category id: ", error)
                Alert.alert(
                    'Load Items Fail',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(loadItemsFailureByCategoryId())
            });
    }
}

