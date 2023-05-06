import { Checkbox, Col, Row } from "antd";
import Check_ghe from "./check_ghe";
import { useEffect, useState } from "react";


const Content = (props) => {
  const {moive,time,room,ticket,setNext,setData} = props;
  const [Chon_ghe, setChon_ghe] = useState([])
  const [tong, setTong] = useState(0)
 
  useEffect(() =>{
    setData({
      tong: tong,
      ghe_chon: Chon_ghe,
    })
  },[tong,Chon_ghe])
  const Change =()=>{
    
    setNext(false)
    
  }
  let SelectedChair = ticket.reduce((item,value)=>{    
       return item.concat(value.number)
  },[])
  
  console.log("SelectedChair",SelectedChair, time)
  


  return (
    <>
      <div className="content_booking">
        <div className="checkghe_left">
          <p>
            Để chọn ghế vui lòng chọn ghế ưa thích theo icon
            <br></br>
            Click tiếp vào ghế đã chọn để xóa lựa chọn
          </p>
          <p className="tickit">
            <span id="defaultCountdown" className="hasCountdown"></span>
            <b>0 : 0</b>
          </p>

          <ul className="list-ghe">
            <li>
              <img
                style={{ width: 25, height: 22 }}
                src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000193_ghe-vip.jpg"
                alt="Ghe Vip"
              ></img>{" "}
              Ghế vip
            </li>
            <li>
              <img
                style={{ width: 25, height: 22 }}
                src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000194_Gh%e1%ba%bf thường.jpg"
                alt="Ghe thuong"
              ></img>{" "}
              Ghế thường
            </li>{" "}
            <li>
              <img
                style={{ width: 25, height: 22 }}
                src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000284_ghe-doi.jpg"
                alt="Ghe thuong"
              ></img>{" "}
              Ghế đôi
            </li>{" "}
            <li>
              <img
                style={{ width: 25, height: 22 }}
                src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_active.png"
                alt="Ghe thuong"
              ></img>{" "}
              Ghế đã chọn
            </li>{" "}
            <li>
              <img
                style={{ width: 25, height: 22 }}
                src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_lock.png"
                alt="Ghe thuong"
              ></img>{" "}
              Ghế đã bán
            </li>
          </ul>
          <img
            src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/img49.png"
            className="img-center"
            style={{ width: 609, height: 32 }}
          ></img>

     <Check_ghe time={time} setTong={setTong} moive={moive} SelectedChair={SelectedChair} Chon_ghe={Chon_ghe} setChon_ghe={setChon_ghe}></Check_ghe>
        </div>
        <div className="checkmoive_right">
          <button className="title-moive_check">CHỌN LẠI PHIM</button>
          <img
            src={moive.images}
            style={{ width: 176, height: 260 }}
          ></img>
          { Chon_ghe.length >0  &&(
            <div className="order-card">
            <p>Ghế chọn mua: <span style={{color:"yellow"}}>{Chon_ghe.map((item)=> `${item} ` )}</span> </p>
            <p>Số lượng: <span style={{color:"yellow"}}>{Chon_ghe.length}</span> </p>
            <p className="total">TỔNG: <span style={{color:"yellow"}}>{`${tong/1000}.000` } VND </span></p>
            <button className="btn-ao-continue" onClick={Change}>Tiếp theo</button>
           </div>
          )

          }
          
        </div>

        
      </div>
    </>
  );
};

export default Content;
