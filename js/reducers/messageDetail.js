
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
            console.log("state di reduc: ", state)
            console.log("action di reduc: ", action)
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
            console.log("state timeline: ", state)
            console.log("init dari reducers: ", action.message)
            let idObjects = state.map(function (x) {
                console.log("isi x object: ", x)
                return x.TempMessageId
            })

            console.log("isi id object: ", idObjects)
            console.log("isi action: ", action)

            // console.log("isi id action timeline id: ", action.note.Note.TempNoteId)

            let idObject = idObjects.indexOf(action.message.TempMessageId)
            console.log("isi id object seletah: ", idObject)
            if (idObject > -1) {
                let newMessageFilter = state.filter((data) => {
                    console.log("isi filter: ", data)
                    return data.fake != true
                })
                console.log("new timeline filter: ", newMessageFilter)
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
