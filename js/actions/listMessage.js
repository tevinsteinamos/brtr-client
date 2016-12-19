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

import type { Action } from './types';

export const LIST_MESSAGE = 'LIST_MESSAGE';
export const LIST_MESSAGE_SUCCESS = 'LIST_MESSAGE_SUCCESS';
export const LIST_MESSAGE_FAILURE = 'LIST_MESSAGE_FAILURE';



export function listMessage(): Action {
    return {
        type: LIST_MESSAGE
    }
}

export function listMessageSuccess(item): Action {
    return {
        type: LIST_MESSAGE_SUCCESS,
        item: item
    }
}

export function listMessageFailure(): Action {
    return {
        type: LIST_MESSAGE_FAILURE
    }
}

export function listMessageProcess(token) {
    return (dispatch) => {
        dispatch(listMessage())
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/messages/itemMessage/all`, {
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
                    dispatch(listMessageFailure())
                } else if(data.message == "Not Found"){
                    dispatch(listMessageFailure())
                }else {
                    dispatch(listMessageSuccess(data))
                }
            })
            .catch((error) => {
                Alert.alert(
                    'Register Fail',
                    'something wrong, please register again',
                    [
                        {text: 'OK'},
                    ]
                )
                dispatch(listMessageFailure())
            });
    }
}
