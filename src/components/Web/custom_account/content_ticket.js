import { Button, Modal,message,Input } from 'antd';
import './index.css'
import { useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { textFieldClasses } from '@mui/material';
const { TextArea } = Input;

const Content_Ticket = (props) => {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async() => {
       await axios.put(`/api/ticket/ticket-cancel/${billID}`).then((res)=>{
          if(res.data.success) {
            message.success("Đã gửi yêu cầu hủy vé của bạn")
            setLoad(!load)
          }
          else if(!res.data.success) {
            console.log(res.data.message)
            message.error(res.data.message)
          }
      }).catch((err)=>{
        message.error("Gửi yêu cầu không thành công")
        console.log(err)
      
      })
      setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //// Danh gia ------
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const handleOk1 = async() => {
      
      setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const ClickRating = async () => {
    await axios.post(`/api/vote`,{
      user: ticket.user._id,
      moive: ticket.showTime.moive._id,
      ticket: ticket.tiketID,
      star: value,
      description: text


      
    }).then((res)=>{
      if(res.data.success) {
        message.success("Đã gửi đánh giá của bạn thành công.")
        setLoad(!load)
      }
      else if(res.data.success) {
        message.error("Gửi yêu cầu không thành công")
      }
  }).catch((err)=>{
    message.error("Gửi yêu cầu không thành công")
    console.log(err)
  
  })

  }

    return ( 
    <>
      <div className="main-default_acc">
    <h3 className='title-ticket-acc'>THÔNG TIN VÉ CỦA BẠN</h3>
    <div className='group-ticket'>
          {
            tickets.map((item,index)=>
             
            {
              const moive = item.ticket.showTime.moive;
              const time = new Date(item.ticket.showTime.time);
              const combo = item.combo
               return (
                <div className='item-ticket' key={item.ticket.tiketID}>
               
                 
                 
                 { !item.ticket.vote && !item.ticket.showTime.status ? (<>
                  {item.cancel  ? <>
                  
                  <div className='ticket-cancel load'>Đang chờ hủy</div>
                </> : <>
                { item.status && !item.ticket.showTime.status ? (<>
                    <div className='ticket-success'>Đã xác nhận</div>
                </>) :
                <><div className='ticket-loadding'>Chờ xử lý</div></>

                }
               
                <Button type="primary" className='ticket-cancel' onClick={()=>{
                  
                  showModal()
                  setBillID(item._id)
                  
                  }} danger>Hủy vé</Button>
                </>

                }
               
               
                 </>):

                 (<>
                 
                 
                 </>)

                 }
                 {
                 !item.ticket.vote && item.ticket.showTime.status ? <>
                    <Button type="primary" className='ticket-cancel' onClick={()=>{
                  
                  showModal1()
                  setTicket(item.ticket)
                  
                  }} >Đánh giá</Button>
                  </> :
                  <>
                 
                  </>
                 }
                  {
                    item.ticket.vote &&  item.ticket.showTime.status ? <>
                    <Button type="primary" className='ticket-cancel' onClick={()=>{
                  
                  
                  }} >Đã đánh giá</Button>
                  </> :
                  <>
                 
                  </>
                 }
              
                 
                 
                    <img src={moive.images} ></img>
                    <div className='block-moive-ticket'>
                   <p><strong>SUẤT CHIẾU: { time.getHours() >9 ? time.getHours() :`0${ time.getHours()}`} :  { time.getMinutes() >9 ? time.getMinutes() : `${time.getMinutes()}0`} - {time.getDay()>0 ? `Thứ ${time.getDay()+1}` :`Chủ nhật`} : {time.getDate()}/{time.getMonth()+1}/{time.getFullYear()}</strong></p> 

                    <strong>{moive.name}</strong>
                    <p style={{color:"#222", fontWeight:"500"}}>Phòng chiếu: {item.ticket.showTime.room.name}</p>
                    <p>ID vé : {item.tiketID}</p>
                    <p>Số ghế: {item?.ticket?.number?.map(item=>`${item}, `)}</p>
                    <p>Combo: {combo?.map(item=> `${item.name} - Số lượng : ${item.value} `)}  </p>
                    <p style={{color:"red"}}><span style={{color:"#222", fontWeight:"500"}}>Tổng số tiền:</span> {item.price/1000}.000 VND</p>
                    
                    </div>
                    <div className='block-moive-ticket'> 
                    <p>Tài khoản: {item.ticket.user.username}</p>
                    <p>Email: {item.ticket.user.email}</p>
                    <p>Số điện thoại: {item.ticket.user.phoneNumber}</p>
                    <p>Hình thức thanh toán: {item.payment}</p>
                    <img src={item.ticket.maQR} style={{width: '46%'}}></img>
                    </div>
                </div>

               )

            })
          }
      </div>
      </div>
      <Modal title="Bạn xác nhận hủy vé chứ ? " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Nếu xác nhận hủy vé, yêu cầu của bạn sẽ được gửi. Bạn hãy theo dõi Email để chờ kết quả phàn hồi từ chúng tôi</p>
          <p>Trân trọng</p>
        </Modal>
        <Modal title="Hãy cho chúng tôi biết về cảm nhận của ban ! " open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
        <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Chất lượng </Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
       
      />
      
    </Box>
    
    <TextArea
        rows={3}
        id="description"
        defaultValue={text}
        name="description"
        onChange={(e)=>{
          setText( e.target.value)
          
        }}
        placeholder="Enter your description"
       
      />
       <Button style={{marginTop:10}} type="primary" onClick={ClickRating}>Gửi</Button>
        </Modal>
       
    </> );
}
 
export default Content_Ticket;