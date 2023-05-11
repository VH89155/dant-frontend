import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Content_trash from "../../components/Admin/moivePage/content-trash";
import axios from "axios";

const TrashMoive = () => {
    const dispatch = useDispatch()
    const [load,setLoad] = useState(true)
    const [moives,setMoives] = useState([])    
   
    useEffect(()=>{
        const fetch = async() =>{
         axios.get("/api/moive/trash/trash-moive").then((res)=>res.data)
         .then((res)=>{
          
          setMoives(res);
        } )
 
     } 
     fetch()
 
     },[load])

    return ( <>
    <Content_trash moives={moives} setLoad ={setLoad} load={load}  > </Content_trash>
    </> );
}
 
export default TrashMoive;