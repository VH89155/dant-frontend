import { useEffect, useState } from "react";
import Booking_time from "../../components/Web/ticket-booking/booking_time";
import Form_Check from "../../components/Web/ticket-booking/form_check_moive";
import "../../components/Web/ticket-booking/ticket-booking.css"
import axios from "axios"



const TicketBooking = () => {
  const admin =false;
   const [allMoives,setAllMoives] = useState([])
   const [checkMoives,setCheckMoives] = useState('') 
   const [showTimes,setShowTimes] = useState([])
   const timeNow = new Date()
   const [time,setTime] = useState(`${timeNow.getDate()}-${timeNow.getMonth()+1}-${timeNow.getFullYear()}`)
   useEffect(()=>{
    axios.get("/api/moive").then((res)=>res.data)
    .then((res)=>{ setAllMoives(res.moives)
    })
    if(checkMoives !==""){
        axios.post(`/api/moive/moive-time?moives=${checkMoives}&time=${time}`).then((res)=>{      
            setShowTimes(res.data)
        } )
       }
       if(checkMoives ===""){
        axios.post(`/api/moive/moive-time?moives=&time=${time}`).then((res)=>{      
            setShowTimes(res.data)
        } )
       }
   },[checkMoives,time])
//    console.log(checkMoives)
//    console.log(time)
   

    return (  <>
        <div className="container">
        <div className="page-title">
          <div className="title"> 1. CHỌN PHIM</div>
          <img src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/img48.png"></img>
        </div>
        <div className="content-booking">
          <div className="check-mov">
            <div className="right_title"> CHỌN PHIM</div>
              <Form_Check  allMoives ={allMoives} setCheckMoives={setCheckMoives}></Form_Check>
         </div>
         <div className="booking-time">
              
              <div className="right_title">RẠP CHIẾU PHIM CSV</div>
               <Booking_time admin={admin} setTime= {setTime} showTimes={showTimes}></Booking_time>
        </div>
         
        </div>
        </div>
      
    </>);
}
 
export default TicketBooking;