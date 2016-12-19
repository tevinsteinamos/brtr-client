
import type { Action } from '../actions/types';
import {
    SEARCH_ITEM,
    SEARCH_ITEM_SUCCESS,
    SEARCH_ITEM_FAILURE,
    CLEAR_SEARCH_ITEM
} from '../actions/searchItem';

const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case SEARCH_ITEM:
            return []

        case SEARCH_ITEM_SUCCESS:
            if (action.item.length === 0) {
                return [{id:0, finish: true}]
            }
            else {
                return action.item
            }

        case SEARCH_ITEM_FAILURE:
            return state

        case CLEAR_SEARCH_ITEM:
            return []

        default:
            return state
    }
}
