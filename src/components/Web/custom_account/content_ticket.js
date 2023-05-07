import './index.css'

const Content_Ticket = (props) => {
  let {tickets} = props
  tickets.sort((a,b)=>{
    if (a.showTime.time > b.showTime.time) return -1;
    if (a.showTime.time < b.showTime.time) return 1;
    return 0;
  })
    return ( 
    <>
      <div className="main-default_acc">
    <h3 className='title-ticket-acc'>THÔNG TIN VÉ CỦA BẠN</h3>
    <div className='group-ticket'>
          {
            tickets.map((item,index)=>
             
            {
              const moive = item.showTime.moive;
              const time = new Date(item.showTime.time);
              const combo = item.combo
               return (
                <div className='item-ticket'>
                    <img src={moive.images} ></img>
                    <div className='block-moive-ticket'>
                   <p><strong>SUẤT CHIẾU: { time.getHours() >9 ? time.getHours() :`0${ time.getHours()}`} :  { time.getMinutes() >9 ? time.getMinutes() : `${time.getMinutes()}0`} - {time.getDay()>0 ? `Thứ ${time.getDay()+1}` :`Chủ nhật`} : {time.getDate()}/{time.getMonth()+1}/{time.getFullYear()}</strong></p> 

                    <strong>{moive.name}</strong>
                    <p style={{color:"#222", fontWeight:"500"}}>Phòng chiếu: {item.showTime.room.name}</p>
                    <p>ID vé : {item.tiketID}</p>
                    <p>Số ghế: {item.number.map(item=>`${item}, `)}</p>
                    <p>Combo: {combo.map(item=> `${item.name} - Số lượng : ${item.value} `)}  </p>
                    <p style={{color:"red"}}><span style={{color:"#222", fontWeight:"500"}}>Tổng số tiền:</span> {item.price/1000}.000 VND</p>
                    
                    </div>
                    <div className='block-moive-ticket'> 
                    <p>Tài khoản: {item.user.username}</p>
                    <p>Email: {item.user.email}</p>
                    <p>Số điện thoại: {item.user.phoneNumber}</p>
                    <p>Hình thức thanh toán: {item.payment}</p>
                    </div>
                </div>

               )

            })
          }
      </div>
      </div>
    </> );
}
 
export default Content_Ticket;