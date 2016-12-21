
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    AsyncStorage
} = ReactNative;

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

export const CLEAR_ITEM = 'CLEAR_ITEM'


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

                dispatch(loadItemsSuccessByUserId(responseJson))
            })
            .catch((error) => {

                Alert.alert(
                    'Load Items Fail',
                    [
                        {text: 'OK'},
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
                dispatch(createItemSuccess(responseJson))
                navigator.push({id: 'itemDetail', ItemId: responseJson.data.id})
            })
            .catch((error) => {
                Alert.alert(
                    'Register Fail',
                    'something wrong, please register again',
                    [
                        {text: 'OK'},
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
                dispatch(deleteItemSuccess(responseJson))
                navigator.resetTo({id: 'profileDetail'})
            })
            .catch((error) => {
                Alert.alert(
                    'Load Items Fail',
                    [
                        {text: 'OK'},
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
    const userDecoded = decode(token)
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
                dispatch(updateItemSuccess(responseJson))
                navigator.replacePreviousAndPop({id: 'itemDetail', ItemId: responseJson.data.id})
            })
            .catch((error) => {
                Alert.alert(
                    'Register Fail',
                    'something wrong, please register again',
                    [
                        {text: 'OK'},
                    ]
                )
                dispatch(updateItemFailure())
            });
    }
}

export function clearItem() {
    return ({type: CLEAR_ITEM})
}
