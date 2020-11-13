import {GET_BUYER} from '../actions/types'

export default function(state = null, action) {
    switch(action.type){
        case GET_BUYER:
            return {
                ...state,
                cart: action.payload || false};
        default: 
            return state;
    }
}