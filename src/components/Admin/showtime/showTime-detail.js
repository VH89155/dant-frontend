import { useEffect,useState } from "react";
import "./index.css"
import axios from "axios";
import Tickets_ShowTime_Detail from "./tickets";

const SHowTime_Detail = (props) => {
    const {showTime,load, setLoad} = props;
    const [moive,setMoive] = useState({})
    const [room,setRoom] = useState({})
    let times = new Date()
    const [time,setTime] = useState(times)
    const [ticket,setTicket] = useState([])
   
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
               
                // setTime(response.data.arayTimeDate);
              })
             
            }
            catch(err){
            //   navigate("/")
            console.log(err)
            }
            
          }
          fetchData();
    },[showTime])

    return ( <>
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
            <button className="btn btn-danger" >Chỉnh sửa</button>
            {/* <button className="btn btn-success" >Xoá</button> */}
            </div>

        </div>    
        <div className="bottom">
            <Tickets_ShowTime_Detail ticket={ticket}></Tickets_ShowTime_Detail>

        </div>
    </div>
    
    </> );
}
 
export default SHowTime_Detail;