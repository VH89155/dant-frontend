import { useEffect, useState } from "react";
import Content_pageMoive from "../../components/Admin/moivePage/contentPage";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoive } from "../../redux/apiRequest";
import axios from "axios";

const MoivePage = () => {
    const dispatch = useDispatch()
    const [load,setLoad] = useState(true)
    const [moives,setMoives] = useState(useSelector((state)=>state.moive?.moives?.allMoives))    
    // getAllMoive(dispatch)
    useEffect(()=>{
       const fetch = async() =>{
        axios.get("/api/moive").then((res)=>res.data)
        .then((res)=>{
         setMoives(res.moives);
       } )

    } 
    fetch()

    },[load])
    return ( <>

    <Content_pageMoive moives={moives} setLoad ={setLoad} load={load} ></Content_pageMoive>
    </> );
}
 
export default MoivePage;