import { GET_BUYER, GET_SELLER } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case GET_BUYER:
      return {
        ...state,
        cart: action.payload || false,
      };
    case GET_SELLER:
      return {
        ...state,
        seller: action.payload,
      };
    default:
      return state;
  }
}
