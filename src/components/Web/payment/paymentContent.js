import "./index.css";
import { Checkbox, Form, Input, InputNumber, Space, Button ,Radio,Modal,message} from "antd";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PaymentContent = (props) => {
  const auth = useSelector((state)=>state.auth?.login?.currentUser?.info)
  // const navigate = useNavigate()
  // if(!auth){
  //   navigate("/")
  // }
  const { state } = props;
  const [check,setCheck] = useState(false)
  const [payment, setPayment] = useState("")
  const { data, room, moive, total, chon_combo,showtimeId } = state;
  console.log(showtimeId)
  let { time } = state;
  time = new Date(time);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setPayment(e.target.value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async() => {
    // setIsModalOpen(false);
    await axios.post("http://localhost:8080/api/ticket/add-ticket",
      {
        time : showtimeId,
        user: auth?._id,
        number: data.ghe_chon,
        price: total,
        // payment:setPayment,
        // combo: chon_combo
      }
    ) .then((res)=>{
      console.log(res.data)
      message.success("Thanh toán thành công")
      setIsModalOpen(false);
      
    }).catch(err=>{
      console.log(err)
      message.err("Thanh toán thất bại, Lỗi: ",err)
      setIsModalOpen(false);
    })
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const ThanhToan = ()=>{
    if(!check){
      alert("Bạn chưa đồng ý điều khoản để mua vé !")
    }
    else if (payment ===""){
      alert("Bạn chưa chọn hình thức thanh toán !")
    }
    else{
      showModal();
    }
  }

  return (
    <>
      <div className="page-title-booking">THANH TOÁN</div>
      <div className="booking-progress">
        <div className="content-pay">
          <div className="content-pay__left">
            <div className="opc1">
              <div className="opc1__label">Bước 1: GIẢM GIÁ</div>
              <p className="opc1-notice">
                Hiện tại tính năng thanh toán bằng Voucher, Coupon, Điểm trên
                Website đang bảo trì, để sử dụng vui lòng tải/cập nhật ứng dụng
                CGV mới nhất để tiếp tục
              </p>
              <Form>
                <Form.Item style={{ paddingLeft: 20 }} label="Nhập mã giảm giá">
                  <Input style={{ width: 200, marginRight: 20 }}></Input>
                  <Button type="primary" htmlType="submit">
                    Áp dụng
                  </Button>
                </Form.Item>
              </Form>
            </div>

            <div className="opc2">
              <div className="opc1__label">Bước 2: HÌNH THỨC THANH TOÁN</div>
              <div className="check-out-step">
                <Radio.Group onChange={onChange} style={{paddingLeft:20}} >
                  <Space direction="vertical">
                    <Radio value={"ATM"} style={{display:"flex"}}> 
                        <img style={{width:"37px", height:"37px", marginRight:10}}
                         src="https://ocwckgy6c1obj.vcdn.cloud/media/catalog/product/placeholder/default/atm_icon.png"></img>
                    ATM card (Thẻ nội địa)</Radio>
                    <Radio value={"Visa"} style={{display:"flex"}}> 
                        <img style={{width:"37px", height:"37px", marginRight:10}}
                         src="https://ocwckgy6c1obj.vcdn.cloud/media/catalog/product/placeholder/default/visa-mastercard-icon.png"></img>
                   Thẻ quốc tế (Visa, Master, Amex, JCB)</Radio>
                    <Radio value={"momo"} style={{display:"flex"}}> 
                        <img style={{width:"37px", height:"37px", marginRight:10}}
                         src="https://ocwckgy6c1obj.vcdn.cloud/media/catalog/product/placeholder/default/momo_icon.png"></img>
                   Ví MoMo</Radio>
                    <Radio value={"zaloPay"} style={{display:"flex"}}> 
                        <img style={{width:"37px", height:"37px", marginRight:10}}
                         src="https://ocwckgy6c1obj.vcdn.cloud/media/catalog/product/placeholder/default/logo-zalopayt22023.jpg"></img>
                           Ví Zalo Pay</Radio>
                    {/* <Radio value={4}>
                      More...
                      {value === 4 ? (
                        <Input
                          style={{
                            width: 100,
                            marginLeft: 10,
                          }}
                        />
                      ) : null}
                    </Radio> */}
                  </Space>
                </Radio.Group>
               
              </div>
            </div>
            <Checkbox
            style={{marginTop:10}}
            onChange={()=>{
                    setCheck(!check)
                }}><span  style={{marginLeft:10}}> Tôi đồng ý với điều khoản sử dụng và mua vé cho người có độ tuổi phù hơp</span> </Checkbox> 
        
          </div>
          
        </div>
                  
        {/* bottom-booking -------------------*/}
        <div className="bottom-booking">
          <div className="format-bg-top"></div>
          <div className="group">
            <button className="btn-previous">
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
              <p>
                Combo:{" "}
                {chon_combo.map((item) => {
                  if (item.value > 0) return `${item.name}, `;
                })}{" "}
              </p>
              <p>
                Giảm giá:{" "}
               
              </p>
              <p>
                Tổng tiền:{" "}
                <span style={{ color: "red" }}>{total / 1000}.000 VND</span>{" "}
              </p>
            </div>
            <button className="btn-previous" onClick={ThanhToan} style={{marginRight:20}}>
             
                <i
                 class="fa-solid fa-money-check"
                  style={{ marginRight: 10 }}
                ></i>
                Thanh toán
             
            </button>
          </div>
          {/* <div className='format-bg-bottom'></div> */}
        </div>
      </div>
      <Modal title="Bạn xác nhận thanh toán chứ !" 
      open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       
      </Modal>
    </>
  );
};

export default PaymentContent;
