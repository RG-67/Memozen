import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserReducers";
import { thunk } from "redux-thunk";

const store = configureStore({
    reducer: {
       user: userReducer, 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});


export default store;