import apis from '../api/index';
import {setCookie, deleteCookie, getCookie } from '../js/index';
import { baseURL } from '../api/index';

export const userLogin = (login, password) => async dispatch => {
    let response = await apis.post('user/signin', {login, password});
    setCookie("jwt", response.data.accessToken, 1);
    dispatch({type: 'USER_SIGNIN', payload: response.data });
}

export const userSignOut = () => async dispatch => {
    setCookie("jwt", "", 0.0000001);
    window.location.replace(`${baseURL}`);
    dispatch({type: 'USER_SIGNOUT'});
}

export const getUser = (token) => async dispatch => {
    let response = await apis.get('user/single', {headers: {token: token}});
    dispatch({type: 'GET_USER', payload: response.data})
}

export const getBuyingDocuments = (token) => async dispatch => {
    let response = await apis.get('buydocs', {headers: {token: token}});
    dispatch({type: 'GET_BUYDOCS', payload: response.data});
}

export const getBuyingDocument = (token, id) => async dispatch => {
    let response = await apis.get(`buydocs/${id}`, {headers: {token: token}});
    dispatch({type: 'GET_BUYDOC', payload: response.data})
}

export const addBuyingDocument = (token, date, docNumber, sellerId, products, totalPrice) => async dispatch => {
    let response = await apis.post(`buydocs/add`, {date, docNumber, sellerId, products, totalPrice}, {headers: {token: token}});
    dispatch({type: 'ADD_BUYDOC', payload: response.data})
}

export const getSellers = (token) => async dispatch => {
    let response = await apis.get('seller', {headers: {token: token}});
    dispatch({type: 'GET_SELLERS', payload: response.data})
}

export const getSeller = (token, id) => async dispatch => {
    let response = await apis.get(`seller/${id}`, {headers: {token: token}});
    dispatch({type: 'GET_SELLER', payload: response.data})
}

export const getBrands = (token) => async dispatch => {
    let response = await apis.get('brand', {headers: {token, token}});
    dispatch({type: 'GET_BRANDS', payload: response.data});
}

export const addBrand = (token, name, models) => async dispatch => {
    let response = await apis.post('brand/add', {name, models}, {headers: {token: token}});
    dispatch({type: 'ADD_BRAND', payload: response.data})
}

export const addModel = (token, id, name) => async dispatch => {
    let response = await apis.put(`brand/model/${id}`, {name}, {headers: {token: token}});
    dispatch({type: 'ADD_MODEL', payload: response.data});
}

export const getProducts = (token) => async dispatch => {
    let response = await apis.get('product', {headers: {token: token}});
    dispatch({type: 'GET_PRODUCTS', payload: response.data})
}

export const addProduct = (token, brandId, model, amount, serialNumbers, netPrice, grossPrice) => async dispatch => {
    let response = await apis.post('product/add', {brandId, model, amount, serialNumbers, netPrice, grossPrice}, {headers: {token: token}});
    dispatch({type: 'ADD_PRODUCT', payload: response.data})
}

export const getSells = (token) => async dispatch => {
    let response = await apis.get('sell', {headers: {token: token}});
    dispatch({type: 'GET_SELLS', payload: response.data})
}

export const findSerials = (token, query) => async dispatch => {
    let response = await apis.get(`product/query/${query}`, {headers: {token: token}});
    dispatch({type: 'FIND_SERIALS', payload: response.data})
}

export const findBySerial = (token, serial) => async dispatch => {
    let response = await apis.get(`product/serial/${serial}`, {headers: {token: token}});
    dispatch({type: 'FIND_BY_SERIAL', payload: response.data});
}

export const addSell = (token, brandId, model, date, sellNetPrice, sellGrossPrice, serialNumber, description) => async dispatch => {
    let response = await apis.post(`sell/add`, {brandId, model, date, sellNetPrice, sellGrossPrice, serialNumber, description}, {headers: {token: token}});
    dispatch({type: 'ADD_SELL', payload: response.data})
}