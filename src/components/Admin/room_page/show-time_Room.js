import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";


import SHowTime_Detail from "../showtime/showTime-detail";



const Show_time_room = (props) => {
   const {room} = props
   console.log("room", room)
   const [showTimes,setShowTimes] = useState([])
   const [isModalOpen1 ,setIsModalOpen1] =useState(false)

  const [showTime, setShowTime] = useState({})
    const showModal1 = () => {
        setIsModalOpen1(true);    
      };      
      const handleOk1 = async() => { 
        setIsModalOpen1(false);     
        // setEdit(false)    
        // setLoad(!load) 
      };
      const handleCancel1 = () => {
        setIsModalOpen1(false); 
        // setEdit(false)    
        // setLoad(!load)       
      };
   useEffect(()=>{
    const fetchData = async ()=>{
        await axios.get(`https://project-datn.herokuapp.com/api/room/showtime-room?room=${room._id}`).then(res=>{
            if(res.data.success){
                console.log(res.data.showTime)
                setShowTimes(res.data.showTime)
            }
        })
    }
    fetchData()
   },[room])

   
   return ( <>
     <div className="moive-time">
         
               {showTimes.map((item, index) => {
                return (
                  <>
                    {item.time.length !== 0 && (
                      <>
                        <div className="label-name" key={index}>
                         {item.date}
                        </div>
                        {item?.array.map((item, index) => {
                          const time = new Date(item.time);
                          return (
                             
                            <>
                             
                              <button
                                onClick={()=>{
                                    showModal1();
                                    setShowTime(item)
                                  
                                  }}
                                type="button"
                                key={index}
                                className="btn btn-outline-danger"
                                style={{ marginRight: 20 }}
                              >
                                {time.getHours() > 9
                                  ? time.getHours()
                                  : `0${time.getHours()}`}{" "}
                                :{" "}
                                {time.getMinutes() > 9
                                  ? time.getMinutes()
                                  : `${time.getMinutes()}0`}
                              </button>
                           
                             </>)

                          
                          
                        })}
                      </>
                    )}
                  </>
                );
              })}
           
             
            
        
        </div>
        <Modal width={1000} title="Chi tiết lịch chiếu" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
                <SHowTime_Detail showTime ={showTime}></SHowTime_Detail>
             </Modal> 

    </> );
}
 
export default Show_time_room;