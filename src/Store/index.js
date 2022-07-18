import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './LoginStatus';
const store = configureStore({
    reducer:{
        loginStat:loginReducer
    }
});
export default store;