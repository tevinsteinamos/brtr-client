var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    AsyncStorage
} = ReactNative;

import decode from 'jwt-decode'

import type { Action } from './types'

export const SEARCH_ITEM = 'SEARCH_ITEM'
export const SEARCH_ITEM_SUCCESS = 'SEARCH_ITEM_SUCCESS'
export const SEARCH_ITEM_FAILURE = 'SEARCH_ITEM_FAILURE'
export const CLEAR_SEARCH_ITEM = 'CLEAR_SEARCH_ITEM'

export function searchProcessInit(): Action {
    return {
        type: SEARCH_ITEM
    }
}

export function searchProcessSuccess(item): Action {
    return {
        type: SEARCH_ITEM_SUCCESS,
        item: item
    }
}

export function searchProcessFailure(): Action {
    return {
        type: SEARCH_ITEM_FAILURE
    }
}

export function clearSearchItem() {
    return {type: CLEAR_SEARCH_ITEM}
}

export function searchProcess(token, text) {
    return (dispatch) => {
        dispatch(searchProcessInit())
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/items/search/${text}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.name == "SequelizeDatabaseError") {
                    dispatch(searchProcessFailure())
                } else {
                    dispatch(searchProcessSuccess(data))
                }
            })
            .catch((error) => {
                Alert.alert(
                    'Something went wrong',
                    error.message,
                    [
                        {text: 'OK'},
                    ]
                )
                dispatch(searchProcessFailure())
            });
    }
}
