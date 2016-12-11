
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

export const LOAD_ITEMS_BY_ID = 'LOAD_ITEMS_BY_ID'
export const LOAD_ITEMS_BY_ID_SUCCESS = 'LOAD_ITEMS_BY_ID_SUCCESS'
export const LOAD_ITEMS_BY_ID_FAILURE = 'LOAD_ITEMS_BY_ID_FAILURE'

import decode from 'jwt-decode'

const SERVER_URL_USERS = 'http://localhost:3000/api'

export function loadItemsByUserId() {
    return {type: LOAD_ITEMS_BY_USER}
}

export function loadItemsSuccessByUserId(items) {
    return {type: LOAD_ITEMS_BY_USER_SUCCESS, items: items}
}

export function loadItemsFailureByUserId() {
    return {type: LOAD_ITEMS_BY_USER_FAILURE}
}

export function getItemsByUserId(token) {
    const UserData = decode(token)
    return (dispatch) => {
        dispatch(loadItemsByUserId())
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
                dispatch(loadItemsSuccessByUserId(responseJson))
            })
            .catch((error) => {
                console.log("fail byUser: ", error)
                Alert.alert(
                    'Load Items Fail',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(loadItemsFailureByUserId())
            });
    }
}




// export function loadItemsById() {
//     return {type: LOAD_ITEMS_BY_ID}
// }
//
// export function loadItemsSuccessById(items) {
//     return {type: LOAD_ITEMS_BY_ID_SUCCESS, item: item}
// }
//
// export function loadItemsFailureById() {
//     return {type: LOAD_ITEMS_BY_ID_FAILURE}
// }
//
// export function getItemsById(token, id) {
//     return (dispatch) => {
//         dispatch(loadItemsById())
//         fetch(`http://192.168.1.241:3000/api/items/${id}`, {
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + token
//             }
//         })
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 console.log("dapet by id: ", responseJson)
//                 dispatch(loadItemsSuccessById(responseJson))
//             })
//             .catch((error) => {
//                 console.log("fail by id: ", error)
//                 Alert.alert(
//                     'Load Items Fail',
//                     [
//                         {text: 'OK', onPress: () => console.log('OK Pressed')},
//                     ]
//                 )
//                 dispatch(loadItemsFailureById())
//             });
//     }
// }
//
