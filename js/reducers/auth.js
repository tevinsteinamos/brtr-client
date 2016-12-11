
import type { Action } from '../actions/types';
import { USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS } from '../actions/auth';


const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case USER_LOGIN_FAILURE:

            return state

        case USER_LOGIN_SUCCESS:
            console.log("reducers succes: ", action)
            return state

        default:
            return state
    }
}
