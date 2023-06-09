import "./index.css";
import { Checkbox, Form, Input, InputNumber, Space, Button ,Radio,Modal,message, Spin} from "antd";
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
  const [spin,setSpin] = useState(false)
  const [payment, setPayment] = useState("")
  const [maGiamGia, setMaGiamGia] = useState("")

  const { data, room, moive, total, chon_combo,showtimeId,ve_chon } = state;
  const [tong, setTong] = useState(total)
  const [giamgia, setGiamgia] = useState("")
  const [ma, setMa] = useState("")
  console.log("ve_chon", data.ve_chon)

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
    await axios.post("https://project-datn.herokuapp.com/api/paypal/pay",{
      time : showtimeId,
      user: auth?._id,
      number: data.ghe_chon,
      price: total,
      payment: payment,
      // payment:setPayment,
      combo: chon_combo,
      ma_giam_gia : maGiamGia,
      ve_chon: data.ve_chon
      
    }).then((res)=>{
      // navigate('https://www.npmjs.com/package/passport-facebook-token')
      return res.data
    }).then((data)=>{
      console.log(data.links)
     
      window.location.replace(`${data.links[0]}`)
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

  //////////////// get max
  const checkMa = async() =>{
    setSpin(true)
     await axios.post("/api/discount/get",{ 
      number: data.ghe_chon, 
      userID: auth?._id, 
      total: total, 
      nameDiscount : ma })
      .then((res)=>{ 
        if(res.data.success) 
        { 
        console.log(res.data) 
        console.log(res.data.discount_value)
        setGiamgia(res.data.discount_value)
        if(res.data.discount_value.includes("%")){
          console.log(parseFloat( res.data.discount_value))
          setTong(( total - total*(parseFloat(res.data.discount_value))/100))
          setMaGiamGia(res.data._id)
        
        }
        else if(!res.data.discount_value.includes("%")) 
        setTong(total - res.data.discount_value)
      } 
      console.log(res.data) 
      if(!res.data.success) 
       message.error(res.data.message)
    })
      .catch((err)=>{ console.log(err) })
      setSpin(false)
    
    
    }

  const navigate = useNavigate()
  useEffect(()=>{
    if(!auth){
      navigate("/login")
    }
  },[])

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
              <Spin spinning={spin}></Spin>
              <Form>
                <Form.Item style={{ paddingLeft: 20 }} label="Nhập mã giảm giá">
                  <Input style={{ width: 200, marginRight: 20 }} onChange={(e)=>{
                    setMa(e.target.value);
                  }}></Input>
                  <Button type="primary" htmlType="submit" onClick={checkMa}>
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
                    <Radio disabled value={"ATM"} style={{display:"flex"}}> 
                        <img style={{width:"37px", height:"37px", marginRight:10}}
                         src="https://ocwckgy6c1obj.vcdn.cloud/media/catalog/product/placeholder/default/atm_icon.png"></img>
                    ATM card (Thẻ nội địa)</Radio>
                    <Radio  disabled value={"Visa"} style={{display:"flex"}}> 
                        <img style={{width:"37px", height:"37px", marginRight:10}}
                         src="https://ocwckgy6c1obj.vcdn.cloud/media/catalog/product/placeholder/default/visa-mastercard-icon.png"></img>
                   Thẻ quốc tế (Visa, Master, Amex, JCB)</Radio>
                    <Radio  disabled value={"MoMo"} style={{display:"flex"}}> 
                        <img style={{width:"37px", height:"37px", marginRight:10}}
                         src="https://ocwckgy6c1obj.vcdn.cloud/media/catalog/product/placeholder/default/momo_icon.png"></img>
                   Ví MoMo</Radio>
                   <Radio  disabled value={"ZaloPay"} style={{display:"flex"}}> 
                        <img style={{width:"37px", height:"37px", marginRight:10}}
                         src="https://ocwckgy6c1obj.vcdn.cloud/media/catalog/product/placeholder/default/logo-zalopayt22023.jpg"></img>
                           Ví Zalo Pay</Radio>
                           <Radio value={"PaylPal"} style={{display:"flex"}}> 
                        <img style={{width:"37px", height:"37px", marginRight:10}}
                         src="https://www.payvnn.com/wp-content/uploads/2010/12/Hoi-dap-Paypal.jpg"></img>
                           PayPal</Radio>

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
                Giảm giá: {giamgia}
               
              </p>
              <p>
                Tổng tiền:{" "}
                <span style={{ color: "red" }}>{tong / 1000}.000 VND</span>{" "}
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
