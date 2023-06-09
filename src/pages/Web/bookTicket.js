import { useParams } from "react-router-dom";
import Content from "../../components/Web/booki_ticket/content";
import Page_title from "../../components/Web/booki_ticket/page-title";
import { useEffect, useState } from "react";
import axios from "axios";
import Booking from "../../components/Web/booki_ticket/booking";
import { useSelector } from "react-redux";

const timeNow = new Date();
const Book_Ticket = (props) => {
    const[ data,setData] = useState({})
    const {showtimeId}= useParams()
  
    const [moive,setMoive] = useState({})
    const [room,setRoom] = useState({})
    const [time,setTime]= useState({})
    const [ticket,setTicket] = useState([])
    const [next,setNext] = useState(true);
    const auth = useSelector((state)=> state?.auth?.login?. currentUser?.info)
    const [overTime,setOverTime] = useState(false);
    
    useEffect(()=>{
        const fetchData = async () =>{
            try{
              await axios.get(`https://project-datn.herokuapp.com/api/show-time/show/${showtimeId}`)
              .then((response) =>{
                console.log(response.data);
                setMoive(response.data.moive);
                console.log("moive",response.data.moive)
              setRoom(response.data.room);
                setTime(response.data.showTime.time);
                setTicket(response.data.ticket)
                // setTime(response.data.arayTimeDate);
              }).then(()=>{
                const timeShow = new Date(time)
                if(auth?.admin){
                  console.log(timeShow)
                  if(timeShow.getTime() +1740000 < timeNow.getTime()) setOverTime(true)

                }
                if(!auth?.admin){
                  console.log(timeShow)
                  if(timeShow.getTime() -1740000  < timeNow.getTime()) setOverTime(true)
                }
              }) 
             
            }
            catch(err){
            //   navigate("/")
            console.log(err)
            }
            
          }
          fetchData();
    },[showtimeId,next,overTime,auth?.admin,time])
    
    return ( <>
        <div className="container">
          {overTime ? (<>
            <p>Rất tiếc bạn đã vượt quá thời gian để đặt vé online khung giờ này.</p>
            <p> Trân trọng</p>
          </>):(<>
            { next ?  (
            <>
             <Page_title moive={moive} room={room} time={time}></Page_title>
             <Content setData={setData} setNext={setNext} ticket={ticket} moive={moive} room={room} time={time}></Content>
             </>
          ):  (
            
            
                  <Booking data={data} moive={moive} room={room} time={time} showtimeId={showtimeId} setNext={setNext}></Booking>
          
          )
          
          }
          
          </>)

          }


       
       
        </div>
        
    
    </> );
}
 
export default Book_Ticket;