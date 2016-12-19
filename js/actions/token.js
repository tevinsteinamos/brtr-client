
var React = require('react');
var ReactNative = require('react-native');
var {
    AsyncStorage
} = ReactNative;
import decode from 'jwt-decode'
import {stopLoading} from './loading'

export const GET_TOKEN = 'GET_TOKEN'
export const REMOVE_TOKEN = 'REMOVE_TOKEN'

export function removeToken() {
    return {type: REMOVE_TOKEN}
}

export async function getToken() {
    try {
        let token = await AsyncStorage.getItem("myKey");
        if (token !== null){
            let dataUser = decode(token)
            return {type: GET_TOKEN, token, dataUser}
        } else {

        }
    } catch (error) {

    }
}
