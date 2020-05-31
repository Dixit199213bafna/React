import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const purchaseBurgerSucess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS_FAILED,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}
export const purchaseBurger = (orderData) => {
    return (dispatch, getState) => {
        dispatch(purchaseBurgerStart());
        axios.post(`/orders.json?auth=${getState().auth.token}`, orderData).then(res => {
            console.log(res.data);
            dispatch(purchaseBurgerSucess(res.data.name, orderData))
        }).catch(e => {
            dispatch(purchaseBurgerFailed())
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START,
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders
    }
}

export const fetchOrdersFail = () => {
    return {
        type: actionTypes.FETCH_ORDER_FAILED,
    }
}
export const fetchOrders = (token, userId) => {
    return (dispatch, getState) => {
        console.log(getState().auth.token);
        dispatch(fetchOrdersStart());
        const querParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios.get(`/orders.json${querParams}`).then(res => {
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key,
                })
                }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        }).catch(e => {
            dispatch(fetchOrdersFail())
        });
    }
}