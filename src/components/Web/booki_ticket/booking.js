import { Checkbox, InputNumber, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Booking = (props) => {
  const { data, moive, room, setNext,showtimeId } = props;
  const [combo,setCombo] = useState([])
  const [chon_combo, setChon_combo] = useState([]);
  const [total, setTotal] = useState(data.tong);
  const Combo = (value) => {
    const cb = chon_combo;    
    // console.log(value);
    let kt = cb.filter(item=> item.id === value.id)
    if(kt.length ===0) {
      cb.push(value);
    }  
     kt = cb.map(item=>{
      if(item.id === value.id){
        return value
      }
      else if (item.id !== value.id)
      return item
    })
  
  console.log(kt)
  let t =data.tong;
  kt.map(item=>{
    t = t + item.gia*item.value
  })
  setTotal(t)
  setChon_combo(kt)
    
   
  };


  const Change = () => {
    setNext(true);
  };
  let { time } = props;
  time = new Date(time);
  console.log(data, time);

  useEffect(()=>{
      axios.get('http://localhost:8080/api/combo').then((res)=>{
        console.log(res.data)
        setCombo(res.data.combo)
      })
  },[])
  return (
    <>
      <div className="page-title-booking">BOOKING ONLINE</div>
      <div className="booking-progress">
        <div className="label">Bắp Nước</div>
        <div className="combo row">
          {combo?.map((item,index)=>{
              return (
                <div className="col-xl-6 item-cb" key={index}>
                <img src={item.images}></img>
                <div className="cb-product">
                  <div className="name-cb">{item.name}</div>
                  <div className="description-cb">
                   {item.description}
                  </div>
                  <div className="price-box">
                    <div>
                      Giá: <span>{item.price/1000}.000 VND</span>
                    </div>
                    <InputNumber
                      min={0}
                      style={{ marginLeft: 20, height: 30, width: 60 }}
                      onChange={(value) => {
                       
                        Combo({
                          id: item._id,
                          name: item.name,
                          value:value,
                          gia: item.price,
                        });
                      }}
                      max={10}
                      defaultValue={0}
                    />
                  </div>
                </div>
              </div>
              )
          })}
         
        
        </div>

        {/* bottom-booking -------------------*/}
        <div className="bottom-booking">
          <div className="format-bg-top"></div>
          <div className="group">
            <button className="btn-previous" onClick={Change}>
              <i class="fa-solid fa-backward" style={{ marginRight: 10 }}></i>
             Quay lại
            </button>
            <div className="moive-group">
              <img src={moive.images}></img>
              <p>
                {moive.name}
                <br></br>
                <p>Phòng chiếu: {room.name}</p>
                <p>
                  SUẤT CHIẾU:{" "}
                  <span style={{ color: "red" }}>
                    {" "}
                    {time.getHours() > 9
                      ? time.getHours()
                      : `0${time.getHours()}`}{" "}
                    :{" "}
                    {time.getMinutes() > 9
                      ? time.getMinutes()
                      : `${time.getMinutes()}0`}
                  </span>{" "}
                </p>
                {time.getDay() > 0 ? `Thứ ${time.getDay() + 1}` : `Chủ nhật`} -{" "}
                {time.getDate()}/{time.getMonth() + 1}/{time.getFullYear()}
              </p>
            </div>
            <div className="ticket-group">
              <p>Ghế chọn: {data.ghe_chon?.map((item) => `${item} `)} </p>
              <p>Tiền vé: {data.tong / 1000}.000 VND </p>
              <p>Combo: {chon_combo.map(item=> {
                  if(item.value >0)
                 return `${item.name}, `})} </p>
              <p >Tổng tiền: <span style={{color:"red"}}>{total / 1000}.000 VND</span> </p>
            </div>
          <button className="btn-previous">
          <Link to= "/default/payment" state={{total:total,data:data, showtimeId:showtimeId, chon_combo:chon_combo,moive:moive,time:time,room:room}}>
            <i class="fa-solid fa-backward fa-flip-horizontal"  style={{ marginRight: 10 }} ></i>
            Tiếp theo
            </Link> 
            </button>
            
          </div>
          {/* <div className='format-bg-bottom'></div> */}
        </div>
      </div>
    </>
  );
};

export default Booking;
