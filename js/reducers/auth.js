
import type { Action } from '../actions/types';
import { USER_LOGIN_FAILURE, USER_LOGIN, USER_LOGIN_SUCCESS, USER_REGISTER_FAILURE, USER_REGISTER_SUCCESS, GET_TOKEN, LOGOUT_USER } from '../actions/auth';


const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case GET_TOKEN:
            let dataToken = {
                token: action.token,
                dataUser: action.dataUser,
                loading: true
            }
            return dataToken

        case USER_LOGIN_SUCCESS:
            return action.user

        case USER_REGISTER_SUCCESS:
            return state

        case USER_LOGIN:
            return action

        case USER_LOGIN_FAILURE:
            return action

        case USER_REGISTER_FAILURE:
            return action

        case LOGOUT_USER:
            return []

        default:
            return state
    }
}
