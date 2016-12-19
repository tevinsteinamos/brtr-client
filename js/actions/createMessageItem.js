
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    AsyncStorage
} = ReactNative;


import type { Action } from './types';

export const CREATE_MESSAGE_ITEM = 'CREATE_MESSAGE_ITEM'
export const CREATE_MESSAGE_ITEM_SUCCESS = 'CREATE_MESSAGE_ITEM_SUCCESS'
export const CREATE_MESSAGE_ITEM_FAILURE = 'CREATE_MESSAGE_ITEM_FAILURE'



import decode from 'jwt-decode'

const SERVER_URL_USERS = 'http://localhost:3000/api'

// export function createItem(UserId, CategoryId,name, description, image, material, dimension, color) {
//     return {type: CREATE_ITEM, User, name, description, image, material, dimension, color}
// }

export function createItemMessageFailure() {
    return {type: CREATE_MESSAGE_ITEM_FAILURE}
}

export function createItemMessageSuccess(messageItem) {
    return {type: CREATE_MESSAGE_ITEM_SUCCESS, messageItem}
}

export function addMessage(title, body, item, itemBarter, token, navigator) {
    const userDecoded = decode(token)
    return (dispatch) => {
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/messages/itemMessage`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                title: title,
                ItemId: item,
                BarteredItemId: itemBarter
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const itemMessageId = responseJson.id
                fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/messages`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        body: body,
                        UserId: userDecoded.id,
                        ItemMessageId: itemMessageId,
                        status: 'unread'
                    })
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        dispatch(createItemMessageSuccess(responseJson))
                        navigator.push({id: 'messageDetail', itemMessageId: itemMessageId, title: title})
                    })
            })
            .catch((error) => {
                Alert.alert(
                    'Register Fail',
                    'something wrong, please register again',
                    [
                        {text: 'OK'},
                    ]
                )
                dispatch(createItemMessageFailure())
            });
    }
}
