import * as actionTypes from '../action/actionTypes';

const initialState = {
    loading: false,
    userId: null,
    error: null,
    token: null,
    authRedirectPath: '/'
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.isToken,
                userId: action.userId,
                error: null,
            }
        case actionTypes.AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.AUTH_LOGOUT: {
            return {
                ...state,
                token: null,
                userId: null,
            }
        }
        case actionTypes.SET_AUTH_REDIRECT_PATH: {
            return {
                ...state,
                authRedirectPath: action.path,
            }
        }
        default: return state
    }
}

export default reducer;