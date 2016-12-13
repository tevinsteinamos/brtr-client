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
import navigateTo from './bottomNav';

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
            console.log('response : ', data);
            if (data.name == "SequelizeDatabaseError") {
              console.log('seq db error');
              dispatch(listMessageFailure())
            } else if(data.message == "Not Found"){
              console.log('not found');
              dispatch(listMessageFailure())
            }else {
              dispatch(listMessageSuccess(data))
            }
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
              dispatch(listMessageFailure())
          });
  }
}
