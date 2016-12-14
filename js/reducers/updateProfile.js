
import type { Action } from '../actions/types';
import {
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE
} from '../actions/updateProfile';


const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case UPDATE_PROFILE_SUCCESS:
            return action.profile

        case UPDATE_PROFILE_FAILURE:
            return state

        default:
            return state
    }
}
