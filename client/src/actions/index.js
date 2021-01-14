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