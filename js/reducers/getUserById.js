
import type { Action } from '../actions/types';
import {
    LOAD_USER_BY_ID,
    LOAD_USER_BY_ID_SUCCESS,
    LOAD_USER_BY_ID_FAILURE
} from '../actions/getUserById';


const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case LOAD_USER_BY_ID:
            return []

        case LOAD_USER_BY_ID_SUCCESS:
            console.log("action load user: ", action)
            return action.user

        case LOAD_USER_BY_ID_FAILURE:
            return state

        default:
            return state
    }
}
