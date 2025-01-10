import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserReducers";

const store = configureStore({
    reducer: {
       user: userReducer, 
    }
});


export default store;