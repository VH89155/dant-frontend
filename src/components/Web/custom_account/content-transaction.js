import { Button, Modal,message,Input } from 'antd';
import './index.css'
import { useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { textFieldClasses } from '@mui/material';
const { TextArea } = Input;

const Content_Transaction = (props) => {
  const[ value,setValue] = useState(5)
  const [ text, setText] = useState("Rất hài lòng! ")
  const [ ticket,setTicket]= useState({})
  const{ load,setLoad} = props
  let {tickets} = props
  tickets.sort((a,b)=>{
    if (a.ticket.showTime.time > b.ticket.showTime.time) return -1;
    if (a.ticket.showTime.time < b.ticket.showTime.time) return 1;
    return 0;
  })
  const [billID,setBillID] = useState('')

  
    return ( 
    <>
      <div className="main-default_acc">
      <h3 className='title-ticket-acc'>LỊCH SỬ GIAO DỊCH</h3>
      <div className='group-ticket'>
          {
            tickets.map((item,index)=>{
              const moive = item.ticket.showTime.moive;
             // const time = new Date(item.ticket.showTime.time);
              const combo = item.combo
              const time = new Date(item.created)
              return(
                <div className='item-ticket' style={{display:"inline-block"}} key={item.ticket.tiketID}>
                  <p style={{color:"#222", fontWeight:"500"}}>Thời gian giao dịch : <span > Ngày: {time.getDate()}-{time.getMonth()+1}-{time.getFullYear()} </span></p>
                 
                
                  <p>Nội dung thanh toán hóa đơn : <span>Mua vé xem phim : {moive.name}, số ghế: {item?.ticket?.number?.map(item=>`${item}, `)}combo đi kèm: {combo?.map(item=> `${item.name} - Số lượng : ${item.value} `)}</span></p>
                
                  <p>Tổng số tiền: <span>{item.price/1000}.000 VND</span> </p>
                  <p>Hình thức thanh toán: <span>{item.payment}</span> </p>
                </div>
              )

            })
             
         
          }
      </div>
      </div>
     
       
    </> );
}
 
export default Content_Transaction;