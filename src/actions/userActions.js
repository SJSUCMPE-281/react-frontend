import axios from "axios";
import { GET_BUYER, GET_SELLER } from "./types";

export const saveBuyer = (newBuyer) => async (dispatch) => {
  const res = await axios.post(
    "http://marketplacebuyer-env.eba-mzeupjpj.us-east-1.elasticbeanstalk.com/api/buyer",
    newBuyer
  );

  dispatch({ type: GET_BUYER, payload: res.data });
};

export const saveSeller = (newSeller) => async (dispatch) => {
  const res = await axios.post(
    "http://marketplaceseller-env.eba-ygz48yhg.us-east-1.elasticbeanstalk.com/api/seller",
    newSeller
  );
  dispatch({ type: GET_SELLER, payload: res.data });
};

export const getSeller = (id) => async (dispatch) => {
  const res = await axios.get(
    `http://marketplaceseller-env.eba-ygz48yhg.us-east-1.elasticbeanstalk.com/api/seller/${id}`
  );
  dispatch({ type: GET_SELLER, payload: res.data });
};
