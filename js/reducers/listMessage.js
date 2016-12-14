
import type { Action } from '../actions/types';
import {
    LIST_MESSAGE,
    LIST_MESSAGE_SUCCESS,
    LIST_MESSAGE_FAILURE,
    EACH_MESSAGE,
    EACH_MESSAGE_SUCCESS,
    EACH_MESSAGE_FAILURE
} from '../actions/listMessage';


const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case LIST_MESSAGE:
            return []

        case LIST_MESSAGE_SUCCESS:
            console.log("init action success : ", action.item)
            return action.item

        case LIST_MESSAGE_FAILURE:
            return state

        case EACH_MESSAGE:
            return []

        case EACH_MESSAGE_SUCCESS:
            console.log("init action success : ", action.item)
            return action.item

        case EACH_MESSAGE_FAILURE:
            return state


        default:
            return state
    }
}
