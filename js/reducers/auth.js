
import type { Action } from '../actions/types';
import { USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS, USER_REGISTER_FAILURE, USER_REGISTER_SUCCESS } from '../actions/auth';


const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case USER_LOGIN_SUCCESS:
            return state

        case USER_REGISTER_SUCCESS:
            return state

        case USER_LOGIN_FAILURE:
        case USER_REGISTER_FAILURE:
            return state

        default:
            return state
    }
}
