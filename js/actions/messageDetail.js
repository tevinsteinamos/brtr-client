
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
export const ADD_MESSAGE_SUCCESS = 'ADD_MESSAGE_SUCCESS'
export const ADD_MESSAGE_FAILURE = 'ADD_MESSAGE_FAILURE'
export const NEW_MESSAGE = 'NEW_MESSAGE'

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

export function newMessage(body,itemMessageId, User, temp) {
    return {type: NEW_MESSAGE, body,itemMessageId, User, temp}
}

export function addMessageSuccess(message) {
    return {type: ADD_MESSAGE_SUCCESS, message: message}
}

export function addMessageFailure() {
    return {type: ADD_MESSAGE_FAILURE}
}

export function addMessage(token,body,itemMessageId, User, temp) {
    return (dispatch) => {
        dispatch(newMessage(body,itemMessageId, User, temp))
        const userDecoded = decode(token)
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/messages`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                TempMessageId: temp,
                body: body,
                UserId: userDecoded.id,
                ItemMessageId: itemMessageId,
                status: 'unread'
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // dispatch(getMessages(token, itemMessageId))
                console.log("respon add message: ", responseJson)
                dispatch(addMessageSuccess(responseJson))
            })
            .catch((error) => {
                console.log("fail add message detail: ", error)
                Alert.alert(
                    'Add Message Fail',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(addMessageFailure())
            });
    }
}
