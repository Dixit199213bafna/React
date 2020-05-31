import * as actionTypes from '../action/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchase: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            return {
                ...state,
                loading: false,
                purchase: true,
                orders: state.orders.concat(newOrder)

            }
        case actionTypes.PURCHASE_BURGER_SUCCESS_FAILED:
            return {
                ...state,
                loading: false,
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchase: false,
            }
        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: [...action.orders],
            }
        case actionTypes.FETCH_ORDER_FAILED:
            return {
                ...state,
                loading: false,
            }
        default: return state;
    }
}

export default reducer;