import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { productListReducer, productsDetailReducer } from "./components/reducer/productReducer";

const initState = {};
const reducer = combineReducers({
    productsList: productListReducer,
    productsDetail: productsDetailReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
