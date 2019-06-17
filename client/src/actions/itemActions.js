import{GET_ITEMS, POST_ITEMS, DELETE_ITEMS, LOADING_ITEMS} from './types';
import axios from 'axios';
import {takeConfig} from './authActions';
import {returnErrors} from './errorActions';

export const getItems = () => dispatch => {  
    dispatch(setLoadingItems());

    axios.get('/api/items')
    .then(res=> dispatch({
        type:GET_ITEMS,
        payload:res.data
    }))
    .catch(err=> dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteItems = id => (dispatch, getState) =>{
    console.log(getState)
    axios.delete(`/api/items/${id}`, takeConfig(getState))
    .then(res=> dispatch({
        type:DELETE_ITEMS,
        payload:id
    })).catch(err=> dispatch(returnErrors(err.response.data, err.response.status)));
}

export const postItems = item => (dispatch, getState) =>{
    axios.post('/api/items', item, takeConfig(getState))
    .then(res=> dispatch({
        type:POST_ITEMS,
        payload:res.data
    })).catch(err=> dispatch(returnErrors(err.response.data, err.response.status))) ;
}

export const setLoadingItems = () => {
    return{
        type:LOADING_ITEMS
    }
}