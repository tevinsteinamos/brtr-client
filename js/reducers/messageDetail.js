
import type { Action } from '../actions/types';
import {
    LOAD_MESSAGES,
    LOAD_MESSAGES_SUCCESS,
    LOAD_MESSAGES_FAILURE,
} from '../actions/messageDetail';


const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case LOAD_MESSAGES:
            return []

        case LOAD_MESSAGES_SUCCESS:
            return action.messages

        case LOAD_MESSAGES_FAILURE:
            return state

        default:
            return state
    }
}
