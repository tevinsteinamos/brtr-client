
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    AsyncStorage
} = ReactNative;

import type { Action } from './types';

export const LOAD_MESSAGES = 'LOAD_MESSAGES'
export const LOAD_MESSAGES_SUCCESS = 'LOAD_MESSAGES_SUCCESS'
export const LOAD_MESSAGES_FAILURE = 'LOAD_MESSAGES_FAILURE'

import decode from 'jwt-decode'

const SERVER_URL_USERS = 'http://localhost:3000/api'

export function loadMessages() {
    return {type: LOAD_MESSAGES}
}

export function loadMessagesSuccess(messages) {
    return {type: LOAD_MESSAGES_SUCCESS, messages: messages}
}

export function loadMessagesFailure() {
    return {type: LOAD_MESSAGES_FAILURE}
}

export function getMessages(token,id) {
    return (dispatch) => {
        dispatch(loadMessages())
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/messages/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                dispatch(loadMessagesSuccess(responseJson))
            })
            .catch((error) => {
                console.log("fail category: ", error)
                Alert.alert(
                    'Load Messages Fail',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(loadMessagesFailure())
            });
    }
}

export function addMessage(token,message) {
    return (dispatch) => {
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/messages`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                TempMessageId: message.TempMessageId,
                body: message.body,
                ItemMessageId: message.ItemMessageId,
                UserId: message.UserId,
                status: message.status
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(addMessageSuccess(responseJson))
            })
            .catch((error) => {
                console.log("fail category: ", error)
                Alert.alert(
                    'Load Messages Fail',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(addMessageFailure())
            });
    }
}
