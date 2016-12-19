
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    AsyncStorage
} = ReactNative;


export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS'
export const LOAD_CATEGORIES_FAILURE = 'LOAD_CATEGORIES_FAILURE'

import decode from 'jwt-decode'

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
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/categories`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(loadCategoriesSuccess(responseJson))
            })
            .catch((error) => {
                Alert.alert(
                    'Load Items Fail',
                    [
                        {text: 'OK'},
                    ]
                )
                dispatch(loadCategoriesFailure())
            });
    }
}
