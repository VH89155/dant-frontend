import { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import axios from "axios";
import Table_priceTicket from "../../components/Admin/priceTicket/table";
import From_PriceTicket from "../../components/Admin/priceTicket/Form";


const PriceTicket_page = () => {
    const [ edit, setEdit] = useState(false)
    const [load,setLoad] =useState(true)
    const [priceTicket,setPriceTicket] = useState([])
    const [name,setName] = useState("")
    const [id,setId] = useState("")
    const [priceTime12,setPriceTime12] = useState(0)
    const [priceTime12_17,setPriceTime12_17] = useState(0)
    const [priceTime17_23,setPriceTime17_23] = useState(0)
    const [priceTime23,setPriceTime23] = useState(0)
    const [status,setStatus] = useState(true)
 
    useEffect(()=>{
        const fetch = async() =>{
            axios.get("https://project-datn.herokuapp.com/api/price-ticket").then((res)=>res.data)
            .then((data)=>{
                console.log(data.priceTicket)
                setPriceTicket(data.priceTicket)
           } )
    
        } 
        fetch() 
    },[load,edit,name,id])
    return ( <>
    <Button type="primary" onClick={(e)=>{
        e.preventDefault()
        setEdit(false)
        setName("")
        setPriceTime12(0)
        setPriceTime12_17(0)
        setPriceTime17_23(0)
        setPriceTime23(0)
        setLoad(!load)
    }} >Tải lại</Button>
    <From_PriceTicket  edit={edit} id={id} name={name} setEdit={setEdit} setId={setId} status={status}  priceTicket={priceTicket} setName={setName} setStatus={setStatus} setPriceTime12={setPriceTime12}  setPriceTime23={setPriceTime23} setPriceTime12_17={setPriceTime12_17} setPriceTime17_23={setPriceTime17_23} load={load}setLoad={setLoad} priceTime12={priceTime12}   priceTime23={priceTime23}  priceTime12_17={priceTime12_17}  priceTime17_23={priceTime17_23}></From_PriceTicket>
    <Table_priceTicket name={name} setEdit={setEdit} setId={setId} status={status}  priceTicket={priceTicket} setName={setName} setStatus={setStatus} setPriceTime12={setPriceTime12}  setPriceTime23={setPriceTime23} setPriceTime12_17={setPriceTime12_17} setPriceTime17_23={setPriceTime17_23} load={load}setLoad={setLoad} ></Table_priceTicket>
    </> );
}
 
export default PriceTicket_page;