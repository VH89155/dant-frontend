import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice ({
    name: "auth",
    initialState :{
        login:{
            currentUser : null,
            token:null,
            isFetching: false,
            error: false,

        },
        register:{
            isFetching:false,
            error: false,
            success :false
        },
        // logout:{
        //     isFetching:false,
        //     error:false,
        // }
    },
    reducers :{
        loginStart: (state) =>{
            state.login.isFetching =true;
        },
        getProfileUpdate: (state,action) =>{
            state.login.isFetching =false;
            state.login.currentUser = action.payload;
            // state.login.token = action.payload.token;
            state.login.error =false;
        },
        ///
        loginStart: (state) =>{
            state.login.isFetching =true;
        },
        loginSusscess: (state,action) =>{
            console.log(action.payload)
            state.login.isFetching =false;
            state.login.currentUser = action.payload;
            state.login.token = action.payload.token;
            state.login.error =false;
        },
        loginFailed :(state) =>{
            state.login.isFetching =false;
            state.login.error =true;
        },
        // register
        registerStart: (state) =>{
            state.register.isFetching =true;
        },
        registerSusscess: (state,action) =>{
            state.register.isFetching =false;
           
            state.register.error =false;
            state.register.success =true
        },
        registerFailed :(state) =>{
            state.register.isFetching =false;
            state.register.error =true;
            state.register.success = false;
        },
        //Logout
        
        logOutSusscess: (state) =>{
            state.login.isFetching =false;
            state.login.currentUser =null;
            state.login.error =false;
        },
        logOutFailed :(state)=>{
            state.login.isFetching=false;
            state.login.error =true;
        },
        logOutStart :(state)=>{
            state.login.isFetching=true;
            state.login.error =false;
        }
    }

});

export const {
    loginFailed,
    loginStart,
    loginSusscess,
    registerFailed,
    registerSusscess,
    registerStart,
    logOutFailed,
    logOutSusscess,
    logOutStart,
    getProfileUpdate
} = authSlice.actions;

export default authSlice.reducer;