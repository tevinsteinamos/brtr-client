
import type { Action } from '../actions/types';
import {
    CREATE_MESSAGE_ITEM,
    CREATE_MESSAGE_ITEM_FAILURE,
    CREATE_MESSAGE_ITEM_SUCCESS
} from '../actions/createMessageItem';

//
const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case CREATE_MESSAGE_ITEM_SUCCESS:
            return action.messageItem

        case CREATE_MESSAGE_ITEM_FAILURE:
            return state

        default:
            return state
    }
}
