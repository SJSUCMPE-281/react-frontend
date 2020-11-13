import axios from 'axios';
import {GET_PRODUCTS, GET_PRODUCT} from './types';

export const getProducts = () => async dispatch => {
    console.log("sggs");
    const res = await axios.get('http://localhost:8081/api/product?page=0&size=30');

    dispatch({type: GET_PRODUCTS, payload:res.data});
}