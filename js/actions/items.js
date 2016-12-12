
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    AsyncStorage
} = ReactNative;

import navigateTo from './bottomNav';

import type { Action } from './types';

export const LOAD_ITEMS_BY_USER = 'LOAD_ITEMS_BY_USER'
export const LOAD_ITEMS_BY_USER_SUCCESS = 'LOAD_ITEMS_BY_USER_SUCCESS'
export const LOAD_ITEMS_BY_USER_FAILURE = 'LOAD_ITEMS_BY_USER_FAILURE'

export const LOAD_ITEMS_BY_ID = 'LOAD_ITEMS_BY_ID'
export const LOAD_ITEMS_BY_ID_SUCCESS = 'LOAD_ITEMS_BY_ID_SUCCESS'
export const LOAD_ITEMS_BY_ID_FAILURE = 'LOAD_ITEMS_BY_ID_FAILURE'

export const CREATE_ITEM = 'CREATE_ITEM'
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS'
export const CREATE_ITEM_FAILURE = 'CREATE_ITEM_FAILURE'

export const DELETE_ITEM = 'DELETE_ITEM'
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS'
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE'

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



export function createItem(UserId, CategoryId,name, description, image, size, material, dimension, color) {
    return {type: CREATE_ITEM, User, name, description, image, size, material, dimension, color}
}

export function createItemFailure() {
    return {type: CREATE_ITEM_FAILURE}
}

export function createItemSuccess(item) {
    return {type: CREATE_ITEM_SUCCESS, item}
}

export function addItem(CategoryId, name, description, photo, size, material, dimension, color, token) {
    const userDecoded = decode(token)
    return (dispatch) => {
        fetch(`http://192.168.1.241:3000/api/items`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                UserId: userDecoded.id,
                CategoryId: CategoryId,
                name: name,
                description: description,
                photo: 'https://cdn.pixabay.com/photo/2015/10/30/14/27/book-1014197_1280.jpg',
                size: size,
                material: material,
                dimension: dimension,
                color: color,
                status: 'up for barter'
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('respon create: ', responseJson)
                dispatch(createItemSuccess(responseJson))
                dispatch(navigateTo('itemDetail', 'addItem', responseJson.data.id))
            })
            .catch((error) => {
                console.log("fail", error)
                Alert.alert(
                    'Register Fail',
                    'something wrong, please register again',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(createItemFailure())
            });
    }
}



export function deleteDataItem(id){
    return {type: DELETE_ITEM, id}
}


export function deleteItemFailure(){
    return {type: DELETE_ITEM_FAILURE}
}

export function deleteItemSuccess(item){
    return {type: DELETE_ITEM_SUCCESS, item}
}

export function deleteItem(id, token){
    return dispatch => {
        dispatch(deleteDataItem(id))
        fetch(`http://192.168.1.241:3000/api/items/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("ini respon item: ", responseJson)
                dispatch(deleteItemSuccess(responseJson))
                dispatch(navigateTo('profileDetail', 'itemDetail'))
            })
            .catch((error) => {
                console.log("fail byUser: ", error)
                Alert.alert(
                    'Load Items Fail',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                )
                dispatch(deleteItemFailure())
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
