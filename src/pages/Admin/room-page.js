import { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import axios from "axios";
import From_Room from "../../components/Admin/room_page/form_room";
import Table_room from "../../components/Admin/room_page/table_room";


const Room_page = () => {
    const [ edit, setEdit] = useState(false)
    const [load,setLoad] =useState(true)
    const [rooms,setRooms] = useState([])
    const [name,setName] = useState("")
    const [id,setId] = useState("")
    const [category,setCategory] = useState("2D")
    const [status,setStatus] = useState(true)
 
    useEffect(()=>{
        const fetch = async() =>{
            axios.get("https://project-datn.herokuapp.com/api/room").then((res)=>res.data)
            .then((data)=>{
                console.log(data.room)
           setRooms(data.room)
           } )
    
        } 
        fetch() 
    },[load,name,status,category,id])
    return ( <>
    <Button type="primary" onClick={(e)=>{
        e.preventDefault()
        setEdit(false)
        setName("")
        setCategory("2D")
        setLoad(!load)
    }} >Tải lại</Button>
           <From_Room name={name} setCategory={setCategory} edit={edit} status={status} setStatus ={setStatus} category={category} rooms={rooms} load={load}setLoad={setLoad} setName={setName} id={id} ></From_Room>
            <Table_room name={name} setEdit={setEdit} setId={setId} status={status} category={category} rooms={rooms} setName={setName} setStatus={setStatus} setCategory={setCategory}  load={load}setLoad={setLoad}></Table_room>
    </> );
}
 
export default Room_page;