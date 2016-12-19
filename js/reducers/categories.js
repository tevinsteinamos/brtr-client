
import type { Action } from '../actions/types';
import {
    LOAD_CATEGORIES,
    LOAD_CATEGORIES_SUCCESS,
    LOAD_CATEGORIES_FAILURE,
} from '../actions/categories';


const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case LOAD_CATEGORIES:
            return []

        case LOAD_CATEGORIES_SUCCESS:
            return action.categories

        case LOAD_CATEGORIES_FAILURE:
            return state

        default:
            return state
    }
}
