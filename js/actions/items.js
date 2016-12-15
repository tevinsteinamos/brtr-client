
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    AsyncStorage
} = ReactNative;

import type { Action } from './types';
import {stopLoading} from './loading'
export const LOAD_ITEMS_BY_USER = 'LOAD_ITEMS_BY_USER'
export const LOAD_ITEMS_BY_USER_SUCCESS = 'LOAD_ITEMS_BY_USER_SUCCESS'
export const LOAD_ITEMS_BY_USER_FAILURE = 'LOAD_ITEMS_BY_USER_FAILURE'

export const CREATE_ITEM = 'CREATE_ITEM'
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS'
export const CREATE_ITEM_FAILURE = 'CREATE_ITEM_FAILURE'

export const DELETE_ITEM = 'DELETE_ITEM'
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS'
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE'


export const UPDATE_ITEM = 'UPDATE_ITEM'
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS'
export const UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE'


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

export function getItemsByUserId(token, id) {
    const UserData = decode(token)
    // console.log('user data: ', UserData)
    return (dispatch) => {
        // dispatch(loadItemsByUserId())
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/items/user/${id}`, {
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
                // dispatch(stopLoading())
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



export function createItem(UserId, CategoryId,name, description, image, material, dimension, color) {
    return {type: CREATE_ITEM, User, name, description, image, material, dimension, color}
}

export function createItemFailure() {
    return {type: CREATE_ITEM_FAILURE}
}

export function createItemSuccess(item) {
    return {type: CREATE_ITEM_SUCCESS, item}
}

export function addItem(CategoryId, name, description, photo, material, dimension, color, token, navigator) {
    // console.log("navigator di add item: ", navigator)
    const userDecoded = decode(token)
    return (dispatch) => {
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/items`, {
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
                photo: photo,
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
                navigator.replace({id: 'itemDetail', ItemId: responseJson.data.id})
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

export function deleteItem(id, token, navigator){
    return dispatch => {
        dispatch(deleteDataItem(id))
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/items/delete/${id}`, {
            method: 'PUT',
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
                navigator.replace({id: 'profileDetail'})
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










export function updateDataItem(id, UserId, CategoryId,name, description, image, material, dimension, color) {
    return {type: UPDATE_ITEM, id, User, name, description, image, material, dimension, color}
}

export function updateItemFailure() {
    return {type: UPDATE_ITEM_FAILURE}
}

export function updateItemSuccess(item) {
    return {type: UPDATE_ITEM_SUCCESS, item}
}

export function updateItem(id, CategoryId, name, description, photo, material, dimension, color, token, navigator) {
    // console.log('id : ', id)
    // console.log('CategoryId : ', CategoryId);
    // console.log('name : ', name);
    // console.log('description : ', description);
    // console.log('photo : ', photo);
    // console.log('material : ', material);
    // console.log('dimension : ', dimension);
    // console.log('color : ', color);
    // console.log('token : ', token);
    // console.log('nav : ', navigator);
    const userDecoded = decode(token)
    console.log('user : ', userDecoded);
    return (dispatch) => {
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/items/${id}`, {
            method: 'PUT',
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
                photo: photo,
                material: material,
                dimension: dimension,
                color: color,
                status: 'up for barter'
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('respon create: ', responseJson)
                dispatch(updateItemSuccess(responseJson))
                navigator.replace({id: 'itemDetail', ItemId: responseJson.data.id})
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
                dispatch(updateItemFailure())
            });
    }
}
