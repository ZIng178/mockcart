import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { productsReducers } from "./reducers/productReducers";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";

const initialState = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    products: productsReducers,
    cart: cartReducer,
    order: orderReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
