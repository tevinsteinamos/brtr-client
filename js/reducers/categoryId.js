
import type { Action } from '../actions/types';
import {
    LOAD_ITEMS_BY_CATEGORY_ID,
    LOAD_ITEMS_BY_CATEGORY_ID_SUCCESS,
    LOAD_ITEMS_BY_CATEGORY_ID_FAILURE,
} from '../actions/categoryId';


const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {


        case LOAD_ITEMS_BY_CATEGORY_ID:
            return []

        case LOAD_ITEMS_BY_CATEGORY_ID_SUCCESS:
            return action.items

        case LOAD_ITEMS_BY_CATEGORY_ID_FAILURE:
            return state

        default:
            return state
    }
}
