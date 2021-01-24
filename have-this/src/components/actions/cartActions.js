import axios from "axios";
import {
    ADD_TO_ITEM,
    REMOVE_ITEM_FROM_CART,
} from "../../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({
        type: ADD_TO_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty,
        },
    });
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const removeItemFromCart = (productId) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_ITEM_FROM_CART, payload: productId });
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};
