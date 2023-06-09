import { useState, useEffect } from "react";
import axios from "axios";

import Banner_Content from "../../../components/Admin/Page-manege/banner-content";

const Banner = () => {
    const [banner,setBanner] = useState({})
    const [load,setLoad]=useState(false)
    useEffect(()=>{
            const fetchData = async ()=>{
                await axios.get('/api/banner').then(res=>{
                        console.log(res.data.banner[0])
                        setBanner(res.data.banner[0])
                   
                })
            }
            fetchData()
    },[load])
    
    
    
    
    return ( <>
        <Banner_Content banner={banner} load={load} setLoad={setLoad}></Banner_Content>
     </> );
}
 
export default Banner;