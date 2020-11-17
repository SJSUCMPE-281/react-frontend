import { GET_MEDIA } from "../actions/types";

const initialstate = {
  images: [],
};

// eslint-disable-next-line
export default function (state = initialstate, action) {
  switch (action.type) {
    case GET_MEDIA:
      return {
        ...state,
        images: action.payload,
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
