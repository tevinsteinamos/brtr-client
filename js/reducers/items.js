
import type { Action } from '../actions/types';
import {
    LOAD_ITEMS_BY_USER,
    LOAD_ITEMS_BY_USER_SUCCESS,
    LOAD_ITEMS_BY_USER_FAILURE,
    LOAD_ITEMS_BY_ID,
    LOAD_ITEMS_BY_ID_SUCCESS,
    LOAD_ITEMS_BY_ID_FAILURE,
    CREATE_ITEM,
    CREATE_ITEM_FAILURE,
    CREATE_ITEM_SUCCESS
} from '../actions/items';


const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case LOAD_ITEMS_BY_USER:
            return []

        case LOAD_ITEMS_BY_USER_SUCCESS:
            console.log('load succes: ', action)
            return action.items

        // case LOAD_ITEMS_BY_ID:
        //     return []
        //
        // case LOAD_ITEMS_BY_ID_SUCCESS:
        //     console.log("init action: ", action)
        //     return action.item


        case CREATE_ITEM_SUCCESS:
            console.log("create reducers item succes")
            return state

        case LOAD_ITEMS_BY_USER_FAILURE:
        case CREATE_ITEM_FAILURE:
        // case LOAD_ITEMS_BY_ID_FAILURE:
            return state

        default:
            return state
    }
}
