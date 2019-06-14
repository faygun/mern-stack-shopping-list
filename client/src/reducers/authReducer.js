import {
    USER_LOADED, 
    USER_LOADING,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    AUTH_ERROR
} from '../actions/types'

const initalState = {
   token : localStorage.getItem('token'),
   user :  null,
   isLoading : false,
   isAuthanticated : null
};

export default function(state = initalState, action){
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading : true
            }
        case USER_LOADED:
            return{
                ...state,
                ...action.payload,
                isLoading : false,
                isAuthanticated : true
            }
            case LOGIN_SUCCESS:
            case REGISTER_SUCCESS:
                return{
                    ...state,
                    ...action.payload,
                    isLoading : false,
                    isAuthanticated : true
                }
            case AUTH_ERROR:
            case LOGIN_FAIL:
            case REGISTER_FAIL:
            case LOGOUT_SUCCESS:
                localStorage.removeItem('token');
                return{
                    ...state,
                    isAuthanticated : false,
                    isLoading : false,
                    user : null,
                    token : null
                }
            default:
                return state;
    }
}