
import type { Action } from '../actions/types';
import {
    STOP_LOADING,
    START_LOADING
} from '../actions/loading';


const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case STOP_LOADING:
            return action.loading

        case START_LOADING:
            return action.loading

        default:
            return state
    }
}
