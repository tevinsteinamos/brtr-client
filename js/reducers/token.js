
import {
    GET_TOKEN,
    REMOVE_TOKEN
} from '../actions/token';


const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_TOKEN:
            let dataToken = {
                token: action.token,
                dataUser: action.dataUser
            }
            return dataToken

        default:
            return state
    }
}
