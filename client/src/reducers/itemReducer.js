import{GET_ITEMS, POST_ITEMS, DELETE_ITEMS, LOADING_ITEMS} from '../actions/types';

const initialState = {
    items: []
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state,
                items:action.payload,
                loading:false
            };
        case DELETE_ITEMS:
            return{
                items:state.items.filter(item=> item._id !== action.payload)
            };
        case POST_ITEMS:
            return{
                ...state,
                items:[action.payload, ...state.items]
            }
            case LOADING_ITEMS:
            return{
                ...state,
                loading:true
            }
        default:
            return state
    }
};
