import "./index.css"

import { useEffect, useState } from "react";
import axios from "axios"
import Booking_time from "../../Web/ticket-booking/booking_time";
import Form_Check from "../../Web/ticket-booking/form_check_moive";

const Content_pageShow = () => {
    const admin = true;  
    const [allMoives,setAllMoives] = useState([])
    const [checkMoives,setCheckMoives] = useState('') 
    const [showTimes,setShowTimes] = useState([])
    const timeNow = new Date()
    const [time,setTime] = useState(`${timeNow.getDate()}-${timeNow.getMonth()+1}-${timeNow.getFullYear()}`)
    const [load,setLoad] = useState(false)
   
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
    },[checkMoives,time,load])


    return ( <>

        <div className="content-booking">
          <div className="check-mov">
            <div className="right_title"> CHỌN PHIM</div>
              <Form_Check  allMoives ={allMoives} setCheckMoives={setCheckMoives}></Form_Check>
         </div>
         <div className="booking-time">
              
              <div className="right_title">RẠP CHIẾU PHIM CSV</div>
               <Booking_time load={load} setLoad={setLoad} admin={admin} setTime= {setTime} showTimes={showTimes}></Booking_time>
        
        </div>
        
        </div>
    </> );
}
 
export default Content_pageShow;