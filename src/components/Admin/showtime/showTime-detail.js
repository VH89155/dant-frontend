import { useEffect,useState } from "react";

import { Modal, message } from "antd"
import "./index.css"
import axios from "axios";
import Tickets_ShowTime_Detail from "./tickets";
import Edit_showtime from "./editShowtime";

const SHowTime_Detail = (props) => {
    const {showTime,load, setLoad, edit, setEdit,setIsModalOpen1} = props;
    const [moive,setMoive] = useState({})
    const [room,setRoom] = useState({})
    let times = new Date()
    const [time,setTime] = useState(times)
    const [ticket,setTicket] = useState([])

    // const [isModalOpen1 ,setIsModalOpen1] =useState(false)
    const SetEdit = ()=>{
      setEdit(!edit)
    }
   const Xoa =async ()=>{
    await axios.delete(`/api/show-time/${showTime._id}`).then((res)=>{
      if(res.data.success){
        message.success("Xóa thành công")
        // setIsModalOpen1(false)
        setLoad(!load)
      }
      if(!res.data.success){
        message.warning(res.data.status)
        // setIsModalOpen1(false)
        setLoad(!load)
      }
    }).catch((err)=>{
      message.error("Xóa không thành công")
    })
   }
   
    // console.log(showTime);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
              await axios.get(`/api/show-time/show/${showTime._id}`)
              .then((response) =>{             
                console.log(response.data);
                setMoive(response.data.moive);
                setRoom(response.data.room);
                setTime( new Date(response.data.showTime.time))
                setTicket(response.data.ticket)
                times = response.data.showTime.time
                // setTime(response.data.arayTimeDate);
              })            
            }
            catch(err){
          
            console.log(err)
            }
            
          }
          fetchData();
    },[showTime,load,edit])

    return ( <>
     {
      !edit ? (
        <div className="showtime-detail">
        <div className="top">
        <img src={moive?.images}></img>
            <div className="moive">
            
            <h3> {moive?.name}</h3>
            <br></br>
            <strong>PHÒNG CHIẾU : <span>{room.name}</span> </strong>
            <br></br>
            <br></br>
            <strong>SUẤT CHIẾU: { time?.getHours() >9 ? time?.getHours() :`0${ time?.getHours()}`} :  { time?.getMinutes() >9 ? time?.getMinutes() : `${time?.getMinutes()}0`} </strong>
            <br></br>
            <br></br>
            <strong>NGÀY CHIẾU:  {time?.getDay()>0 ? `Thứ ${time?.getDay()+1}` :`Chủ nhật`} {time?.getDate()}/{time?.getMonth()+1}/{time?.getFullYear()}</strong>
         </div>
         <div className="group-button">
            <button className="btn btn-danger" style={{marginRight:20}} onClick={SetEdit} >Chỉnh sửa</button>
            <button className="btn btn-danger" onClick={Xoa} >Xoá</button>

            </div>
            

        </div>    
        <div className="bottom">
            <Tickets_ShowTime_Detail ticket={ticket}></Tickets_ShowTime_Detail>

        </div>
       
          {/* <ShowTime_Edit load={load} setLoad={setLoad} showTime ={showTime}></ShowTime_Edit> */}
       
        
      
    </div>
      ) :(
        <Edit_showtime  setEdit={setEdit} times={times} showTime={showTime} load={load} setLoad={setLoad} moive={moive} room ={room} ></Edit_showtime>
      )

     }
   
    
    </> );
}
 
export default SHowTime_Detail;