import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
    name:"LoginStatus",
    initialState:{loggedin:false,username:null},
    reducers:{
        login(state){
            state.loggedin=true;
        },
        logout(state){
            state.loggedin=false;
        },
        setusername(state,action){
            state.username = action.payload;
        }
    }
});

export default LoginSlice.reducer;
export const LoginActions = LoginSlice.actions;