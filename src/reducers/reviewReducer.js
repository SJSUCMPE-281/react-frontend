import { GET_REVIEWS } from "../actions/types";

const initialstate = {
  reviews: [],
  review: {},
};

// eslint-disable-next-line
export default function (state = initialstate, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    //   case DELETE_FILE:
    //     return {
    //       ...state,
    //       files: state.files.filter((file) => file.fileId !== action.payload),
    //     };
    // case GET_PRODUCT:
    //   return {
    //     ...state,
    //     product: action.payload,
    //   };
    default:
      return state;
  }
}
