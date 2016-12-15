
import type { Action } from '../actions/types';
import {
    LOAD_MESSAGES,
    LOAD_MESSAGES_SUCCESS,
    LOAD_MESSAGES_FAILURE,
    ADD_MESSAGE_SUCCESS,
    ADD_MESSAGE_FAILURE,
    NEW_MESSAGE
} from '../actions/messageDetail';


const initialState = []

export default function (state:State = initialState, action:Action): State {
    switch (action.type) {

        case LOAD_MESSAGES:
            return []

        case LOAD_MESSAGES_SUCCESS:
            return action.messages

        case LOAD_MESSAGES_FAILURE:
            return state

        case NEW_MESSAGE:
            return [
                ...state,
                {
                    TempMessageId: action.temp,
                    body: 'temp',
                    ItemMessageId: action.ItemMessageId,
                    User: action.User,
                    status: action.status,
                    fake: true
                }
            ]

        case ADD_MESSAGE_SUCCESS:
            let idObjects = state.map(function (x) {
                return x.TempMessageId
            })

            let idObject = idObjects.indexOf(action.message.TempMessageId)
            if (idObject > -1) {
                let newMessageFilter = state.filter((data) => {
                    return data.fake != true
                })
                return [...newMessageFilter, action.message]
            }
            else {
                return state
            }

        case ADD_MESSAGE_FAILURE:
            return state

        default:
            return state
    }
}
