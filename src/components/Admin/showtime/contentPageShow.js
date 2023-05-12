import "./index.css"

import { useEffect, useState } from "react";
import axios from "axios"
import Booking_time from "../../Web/ticket-booking/booking_time";
import Form_Check from "../../Web/ticket-booking/form_check_moive";
import { Radio } from 'antd';

const Content_pageShow = () => {
    const admin = true;  
    const [allMoives,setAllMoives] = useState([])
    const [checkMoives,setCheckMoives] = useState('') 
    const [showTimes,setShowTimes] = useState([])
    const timeNow = new Date()
    const [time,setTime] = useState(`${timeNow.getDate()}-${timeNow.getMonth()+1}-${timeNow.getFullYear()}`)
    const [load,setLoad] = useState(false)
    const [value, setValue] = useState(1);
    const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };


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
    },[checkMoives,time,load,value])


    return ( <>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Lịch chiếu 10 ngày tới</Radio>
      <Radio value={2}>Lịch chiếu 15 ngày trước</Radio>
      <Radio value={3}>Chọn trong lịch</Radio>
      {/* <Radio value={4}>D</Radio> */}
    </Radio.Group>  
        <div className="content-booking">
          <div className="check-mov">
            <div className="right_title"> CHỌN PHIM</div>
              <Form_Check  allMoives ={allMoives} setCheckMoives={setCheckMoives}></Form_Check>
         </div>
         <div className="booking-time">
              
              <div className="right_title">RẠP CHIẾU PHIM CSV</div>
               <Booking_time value ={value} load={load} setLoad={setLoad} admin={admin} setTime= {setTime} showTimes={showTimes}></Booking_time>
        
        </div>
        
        </div>
    </> );
}
 
export default Content_pageShow;