
import type { Action } from '../actions/types';
import {
    SEARCH_ITEM,
    SEARCH_ITEM_SUCCESS,
    SEARCH_ITEM_FAILURE
} from '../actions/searchItem';


const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case SEARCH_ITEM:
            return []

        case SEARCH_ITEM_SUCCESS:
            return action.item

        case SEARCH_ITEM_FAILURE:
            return state

        default:
            return state
    }
}
