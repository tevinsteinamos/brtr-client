
var React = require('react');
var ReactNative = require('react-native');
var {
    Alert,
    AsyncStorage
} = ReactNative;

import type { Action } from './types';

export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE'


import decode from 'jwt-decode'

export function updateProfileFailure() {
    return {type: UPDATE_PROFILE_FAILURE}
}

export function updateProfileSuccess(profile) {
    return {type: UPDATE_PROFILE_SUCCESS, profile}
}

export function updateProfile(newPassword, photo, token, navigator) {
    const userDecoded = decode(token)
    return (dispatch) => {
        fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/auth/edit_profile/${userDecoded.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                password: newPassword,
                avatar: photo
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(updateProfileSuccess(responseJson))
                navigator.replace({id: 'profileDetail'})
            })
            .catch((error) => {
                Alert.alert(
                    'update Fail',
                    'something wrong, please register again',
                    [
                        {text: 'OK'},
                    ]
                )
                dispatch(updateProfileFailure())
            });
    }
}
