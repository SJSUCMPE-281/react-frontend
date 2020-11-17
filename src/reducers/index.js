import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import sellerProductReducer from "./sellerProductReducer";
import userReducer from "./userReducer";
import mediaReducer from "./mediaReducer";
export default combineReducers({
  products: productReducer,
  cart: cartReducer,
  sellerProducts: sellerProductReducer,
  user: userReducer,
  images: mediaReducer,
});
