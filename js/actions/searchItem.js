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

export const SEARCH_ITEM = 'SEARCH_ITEM';
export const SEARCH_ITEM_SUCCESS = 'SEARCH_ITEM_SUCCESS';
export const SEARCH_ITEM_FAILURE = 'SEARCH_ITEM_FAILURE';

const SERVER_URL_SEARCH = 'http://localhost:3000/api'

export function searchProcessInit(): Action {
  return {
    type: SEARCH_ITEM
  }
}

export function searchProcessSuccess(item): Action {
  return {
    type: SEARCH_ITEM_SUCCESS,
    item: item
  }
}

export function searchProcessFailure(): Action {
  return {
    type: SEARCH_ITEM_FAILURE
  }
}

export function searchProcess(token, text) {
  return (dispatch) => {
    console.log('masuk token :', token);
    console.log('text : ', text);
    dispatch(searchProcessInit())
      fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/items/search/${text}`, {
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
              dispatch(searchProcessFailure())
            } else {
              dispatch(searchProcessSuccess(data))
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
              dispatch(searchProcessFailure())
          });
  }
}
