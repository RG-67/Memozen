import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserReducers";
import { thunk } from "redux-thunk";
import { loadingReducer } from "./reducers/LoadingReducer";

const store = configureStore({
    reducer: {
       user: userReducer,
       loading: loadingReducer 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});


export default store;