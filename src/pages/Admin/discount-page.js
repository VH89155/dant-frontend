import { useEffect, useState } from "react";
import Add_Discount from "../../components/Admin/discount_page/add_discount";
import Table_discount from "../../components/Admin/discount_page/table_discount";
import axios from "axios";


const Discount_page = () => {
    const [load,setLoad] =useState(true)
    const [discounts,setDiscounts] = useState([])

    useEffect(()=>{
        const fetch = async() =>{
            axios.get("/api/discount").then((res)=>res.data)
            .then((data)=>{
           setDiscounts(data.discounts)
           } )
    
        } 
        fetch() 
    },[load])
    return ( <>
            <Add_Discount load={load} setLoad={setLoad}></Add_Discount>

            <Table_discount discounts={discounts} load={load} setLoad={setLoad}></Table_discount>

    </> );
}
 
export default Discount_page;