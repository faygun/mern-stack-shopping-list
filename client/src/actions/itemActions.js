import{GET_ITEMS, POST_ITEMS, DELETE_ITEMS, LOADING_ITEMS} from './types';
import axios from 'axios';

export const getItems = () => dispatch => {  
    dispatch(setLoadingItems());

    axios.get('/api/items')
    .then(res=> dispatch({
        type:GET_ITEMS,
        payload:res.data
    }));
};

export const deleteItems = id => dispatch =>{
    axios.delete(`/api/items/${id}`)
    .then(res=> dispatch({
        type:DELETE_ITEMS,
        payload:id
    }));
}

export const postItems = item => dispatch =>{
    axios.post('/api/items', item)
    .then(res=> dispatch({
        type:POST_ITEMS,
        payload:res.data
    }));
}

export const setLoadingItems = () => {
    return{
        type:LOADING_ITEMS
    }
}