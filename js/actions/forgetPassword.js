var React = require('react');
var ReactNative = require('react-native');
var { Alert, AsyncStorage } = ReactNative;

import type { Action } from './types';


export function forgetPassword(email) {
      fetch(`http://br-tr-dev.ap-southeast-1.elasticbeanstalk.com/api/forgot_password`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      })
          .then((response) => response.json())
          .then((data) => {
            if (data.name == "SequelizeDatabaseError") {

            } else {
            }
          })
          .catch((error) => {
              Alert.alert(
                  'Register Fail',
                  'something wrong, please register again',
                  [
                      {text: 'OK'},
                  ]
              )
          });
}
