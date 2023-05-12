import { useEffect, useState } from "react";
import Content_pageMoive from "../../components/Admin/moivePage/contentPage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import UserPage from "../../components/Admin/user/user-page";


const User_Show = () => {

    const [load,setLoad] = useState(true)
    const [users,setUsers] = useState([])  
    
    useEffect(()=>{
        const fetch = async() =>{
            axios.get("/api/user").then((res)=>res.data)
            .then((res)=>{
           setUsers(res)
           } )
    
        } 
        fetch() 
    },[load])
    return ( <>
      <UserPage users={users} load ={load} setLoad={setLoad}></UserPage>
    </> );
}
 
export default User_Show;