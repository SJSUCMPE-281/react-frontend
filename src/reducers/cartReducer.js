import {GET_CART, DELETE_CART} from '../actions/types'

export default function(state = null, action) {
    switch(action.type){
        case GET_CART:
            return action.payload.orderDetails || false;
        case DELETE_CART:
            return false
        default: 
            return state;
    }
}