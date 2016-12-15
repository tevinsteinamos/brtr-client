
import type { Action } from '../actions/types';
import {
    LOAD_ITEMS_BY_ID,
    LOAD_ITEMS_BY_ID_SUCCESS,
    LOAD_ITEMS_BY_ID_FAILURE
} from '../actions/itemId';


const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case LOAD_ITEMS_BY_ID:
            return []

        case LOAD_ITEMS_BY_ID_SUCCESS:
            return action.itemId

        case LOAD_ITEMS_BY_ID_FAILURE:
            return state

        default:
            return state
    }
}
