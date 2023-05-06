import "./style.css"

const Page_title = (props) => {
   let {moive,room,time} = props 
   const name = moive.name
   console.log(time)
   time = new Date(time)
   console.log(time)
    return (  <>
     <div className="page-title">
          <div className="title"> 2. CHỌN GHẾ NGỒI</div>
          <p>BẠN ĐÃ CHỌN: <span>{name?.toUpperCase()} - {moive.age}</span></p>
          <strong>PHÒNG CHIẾU : <span>{room.name}</span> </strong>
          <br></br>
          <strong>SUẤT CHIẾU: { time.getHours() >9 ? time.getHours() :`0${ time.getHours()}`} :  { time.getMinutes() >9 ? time.getMinutes() : `${time.getMinutes()}0`} - {time.getDay()>0 ? `Thứ ${time.getDay()+1}` :`Chủ nhật`} {time.getDate()}/{time.getMonth()+1}/{time.getFullYear()}</strong>
          
       
       
        </div>
        
    </>);
}
 
export default Page_title;
