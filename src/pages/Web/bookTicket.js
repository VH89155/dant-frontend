import { useParams } from "react-router-dom";
import Content from "../../components/Web/booki_ticket/content";
import Page_title from "../../components/Web/booki_ticket/page-title";
import { useEffect, useState } from "react";
import axios from "axios";
import Booking from "../../components/Web/booki_ticket/booking";

const Book_Ticket = () => {
    const[ data,setData] = useState({})
    const {showtimeId}= useParams()
    const [moive,setMoive] = useState({})
    const [room,setRoom] = useState({})
    const [time,setTime]= useState({})
    const [ticket,setTicket] = useState([])
    const [next,setNext] = useState(true);
    useEffect(()=>{
        const fetchData = async () =>{
            try{
              await axios.get(`/api/show-time/show/${showtimeId}`)
              .then((response) =>{
                console.log(response.data);
                setMoive(response.data.moive);
                setRoom(response.data.room);
                setTime(response.data.showTime.time);
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
    },[showtimeId,next])
    console.log(showtimeId)
    return ( <>
        <div className="container">
          { next ?  (
            <>
             <Page_title moive={moive} room={room} time={time}></Page_title>
             <Content setData={setData} setNext={setNext} ticket={ticket} moive={moive} room={room} time={time}></Content>
             </>
          ):  (
            
            
                  <Booking data={data} moive={moive} room={room} time={time} showtimeId={showtimeId} setNext={setNext}></Booking>
          
          )
          
          }
       
        </div>
        
    
    </> );
}
 
export default Book_Ticket;