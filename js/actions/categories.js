
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    AsyncStorage
} = ReactNative;

import type { Action } from './types';


export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS'
export const LOAD_CATEGORIES_FAILURE = 'LOAD_CATEGORIES_FAILURE'

import decode from 'jwt-decode'

const SERVER_URL_USERS = 'http://localhost:3000/api'

export function loadCategories() {
    return {type: LOAD_CATEGORIES}
}

export function loadCategoriesSuccess(categories) {
    return {type: LOAD_CATEGORIES_SUCCESS, categories: categories}
}

export function loadCategoriesFailure() {
    return {type: LOAD_CATEGORIES_FAILURE}
}

export function getCategories(token) {
    const UserData = decode(token)
    return (dispatch) => {
        dispatch(loadCategories())
        fetch(`http://192.168.1.241:3000/api/categories`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("ini respon category: ", responseJson)
                dispatch(loadCategoriesSuccess(responseJson))
            })
            .catch((error) => {
                console.log("fail category: ", error)
                Alert.alert(
                    'Load Items Fail',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(loadCategoriesFailure())
            });
    }
}
