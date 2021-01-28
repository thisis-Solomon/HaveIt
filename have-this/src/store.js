import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./components/reducer/cartReducer";
import {
    productListReducer,
    productsDetailReducer,
} from "./components/reducer/productReducer";
import { userSigninReducer } from "./components/reducer/userReducer";

const initState = {
    userSignin: {
        userInfo: localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null,
    },
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
    },
};
const reducer = combineReducers({
    productsList: productListReducer,
    productsDetail: productsDetailReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
