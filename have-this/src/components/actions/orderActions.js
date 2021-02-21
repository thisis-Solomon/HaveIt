import axios from "axios";
import { CART_EMPTY } from "../../constants/cartConstants";
import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    DETAILS_ORDER_FAIL,
    DETAILS_ORDER_REQUEST,
    DETAILS_ORDER_SUCCESS,
} from "../../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: CREATE_ORDER_REQUEST, payload: order });

    try {
        const {
            userSignin: { userInfo },
        } = getState();
        const { data } = await axios.post("/api/orders", order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order });
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem("cartItems");
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: DETAILS_ORDER_REQUEST, payload: orderId });

    try {
        const {
            userSignin: { userInfo },
        } = getState();
        const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: DETAILS_ORDER_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: DETAILS_ORDER_FAIL, payload: message });
    }
};
