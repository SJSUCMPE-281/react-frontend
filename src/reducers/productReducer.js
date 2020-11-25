import {
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_SEARCH_RESULTS,
} from "../actions/types";

const initialstate = {
  products: [],
  product: {},
};

// eslint-disable-next-line
export default function (state = initialstate, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.content,
      };
    //   case DELETE_FILE:
    //     return {
    //       ...state,
    //       files: state.files.filter((file) => file.fileId !== action.payload),
    //     };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case GET_SEARCH_RESULTS:
      return {
        ...state,
        products: action.payload.hits.hits.map((h) => h._source),
      };
    default:
      return state;
  }
}
