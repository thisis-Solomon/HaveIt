import {
    ADD_TO_ITEM,
    CART_EMPTY,
    REMOVE_ITEM_FROM_CART,
    SAVE_PAYMENT_METHOD,
    SAVE_SHIPPING_ITEM_CART,
} from "../../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_ITEM:
            const Item = action.payload;
            const existItem = state.cartItems.find(
                (x) => x.product === Item.product
            );
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? Item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, Item],
                };
            }

        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (x) => x.product !== action.payload
                ),
            };

        case SAVE_SHIPPING_ITEM_CART:
            return { ...state, shippingAddress: action.payload };

        case SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };
        case CART_EMPTY:
            return { ...state, cartItems: [] };
        default:
            return state;
    }
};
