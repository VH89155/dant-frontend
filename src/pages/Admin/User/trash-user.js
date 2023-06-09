import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import Content_trash from "../../../components/Admin/user/content-trash";

const TrashUser = () => {
    const dispatch = useDispatch()
    const [load,setLoad] = useState(true)
    const [users,setUsers] = useState([])    
   
    useEffect(()=>{
        const fetch = async() =>{
         axios.get("https://project-datn.herokuapp.com/api/auth/trash/trash-user").then((res)=>res.data)
         .then((res)=>{
          console.log(res)
          setUsers(res);
        } )
 
     } 
     fetch()
 
     },[load])

    return ( <>
        <Content_trash users={users} setLoad ={setLoad} load={load}></Content_trash>
    </> );
}
 
export default TrashUser;