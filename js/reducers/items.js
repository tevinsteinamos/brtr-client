
import type { Action } from '../actions/types';
import {
    LOAD_ITEMS_BY_USER,
    LOAD_ITEMS_BY_USER_SUCCESS,
    LOAD_ITEMS_BY_USER_FAILURE,
    CREATE_ITEM,
    CREATE_ITEM_FAILURE,
    CREATE_ITEM_SUCCESS,
    DELETE_ITEM,
    DELETE_ITEM_FAILURE,
    DELETE_ITEM_SUCCESS,
} from '../actions/items';


const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case LOAD_ITEMS_BY_USER:
            return []

        case LOAD_ITEMS_BY_USER_SUCCESS:
            return action.items

        case CREATE_ITEM_SUCCESS:
            return state

        case DELETE_ITEM:
            return state

        case DELETE_ITEM_SUCCESS:
            return state

        case LOAD_ITEMS_BY_USER_FAILURE:
        case CREATE_ITEM_FAILURE:
        case DELETE_ITEM_FAILURE:
            return state

        default:
            return state
    }
}
