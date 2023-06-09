import axios from "axios";

import { getMoivesSuccsess,getMoivesStart,getMoivesFailed } from "./moiveSlice";

import { getProfileUpdate, loginSusscess, loginStart,loginFailed,logOutFailed,logOutStart,logOutSusscess } from "./authSlice";




// Moive ---------------------------------
export const getAllMoive = async (dispatch)=>{
    dispatch(getMoivesStart());
    try{
        const res = await axios.get(`https://project-datn.herokuapp.com/api/moive`)
        dispatch(getMoivesSuccsess(res.data));
    }
    catch(err){
        dispatch(getMoivesFailed());   
    }
}



// Auth
export const authLogin = async (dispatch, user,navigate) => {
    dispatch(loginStart())
    try{
        const res = await axios.post("https://project-datn.herokuapp.com/api/auth/signin",user);
        dispatch(loginSusscess(res.data))
        navigate("/")
        return true
    }catch(err){
        dispatch(loginFailed())
        return false
    }

}
export const authLoginGoogle = async (dispatch, user,navigate) => {
    dispatch(loginStart())
    try{
        const res = await axios.post("https://project-datn.herokuapp.com/api/auth/auth/google-new",user);
        dispatch(loginSusscess(res.data))
        navigate("/")
        return true
    }catch(err){
        dispatch(loginFailed())
        return false
    }

}
export const getProfile = async (dispatch,token) => {
    dispatch(loginStart())
    try{
        const res = await axios.get("https://project-datn.herokuapp.com/api/auth/secret",{
            headers:{
                Authorization:  `Bearer ${token}`
            }
        });
        dispatch(getProfileUpdate(res.data))
       
    }catch(err){
        dispatch(loginFailed())
    }

}
export const logOut = async(dispatch,navigate,token)=>{
    dispatch(logOutStart());
    try{
        await axios.delete("https://project-datn.herokuapp.com/api/auth/logout",{
            headers:{
                Authorization:  `Bearer ${token}`
            }
        });
        dispatch(logOutSusscess());  
        navigate("/login")
    }
    catch(err){
        dispatch(logOutFailed());
    }
}