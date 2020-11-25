import axios from "axios";
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_REVIEWS,
  GET_SEARCH_RESULTS,
} from "./types";

export const getProducts = () => async (dispatch) => {
  const res = await axios.get(
    process.env.REACT_APP_BUYER_URL + "/api/product?page=0&size=30"
  );

  dispatch({ type: GET_PRODUCTS, payload: res.data });
};

export const getProduct = (sellerId, productId) => async (dispatch) => {
  const res = await axios.get(
    process.env.REACT_APP_SELLER_URL +
      `/api/seller/${sellerId}/product/${productId}`
  );
  dispatch({ type: GET_PRODUCT, payload: res.data });
};

export const getReviews = (id) => async (dispatch) => {
  const res = await axios.get(
    process.env.REACT_APP_SELLER_URL + `/api/product/${id}/review`
  );
  dispatch({ type: GET_REVIEWS, payload: res.data });
};

export const saveProductReview = (history, productId, newReview) => async (
  dispatch
) => {
  const res = await axios.post(
    process.env.REACT_APP_SELLER_URL + `/api/product/${productId}/review`,
    newReview
  );
  history.push("/home");

  dispatch({ type: GET_REVIEWS, payload: res.data });
};

export const getSearchResult = (param) => async (dispatch) => {
  const res = await axios.get(
    "https://b8pwzo8uoa.execute-api.us-east-1.amazonaws.com/test",
    { params: param }
  );
  console.log(res.data);
  dispatch({ type: GET_SEARCH_RESULTS, payload: res.data });
};
