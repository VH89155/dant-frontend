import { useFormik } from "formik";
import { Dayjs } from 'dayjs';

import * as Yup from "yup";
import axios from "axios";
import { Button, Form,Radio, Input, Select,DatePicker,message,Spin } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OptionRoom from "../../../components/Admin/showtime/optionRoom";
import Booking_time from "../../../components/Web/ticket-booking/booking_time";
import ShowTimeAll_Moive from "../../../components/Admin/showtime/showTime-moive";

const AddShowTime = () => {
  const formik = useFormik({
    initialValues: {
      moiveId: "",
      roomId: "",
      time: Date.now(),
    },
    validationSchema: Yup.object({
      moiveId: Yup.string().required("Required"),
      roomId: Yup.string().required("Required"),
      time: Yup.date().required("Required Date"),
    }),
    onSubmit: async (values) => {
      setSpin(true)
      console.log(values);
      await axios.post("https://project-datn.herokuapp.com/api/show-time", values)
      .then((res)=>{
        console.log(res.data)
        if(res.data.statusError==="")message.success("Thêm thành công")
        else if(res.data.statusError!=="")  message.error(res.data.statusError)
        
        setLoad(!load)
        setSpin(false)
      }).catch (()=>{
        message.error("Thêm thất bại")
        setSpin(false)
      })
    },
  });
  const moives = useSelector((state) => state?.moives?.moives?.allMoives);

  const options = moives.map((item, index) => {
    return {
      label: item.name,
      value: item._id,
    };
  });
  const [isRoom,setRoom] =useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("https://project-datn.herokuapp.com/api/room").then((res) => res.data.room);
      setRoom(data.map((item) => {
      return {
        label: item.name,
        value: item._id,
      };
    })) 
      
    };
    fetchData();
  }, [moives]);
  

  const onChangeRoom = (value) => {
    console.log("room = ", value);
    formik.values.roomId = value;
    
  };
  const onChangeMoive = (value) => {
    console.log("Moive= ", value);
    setCheckMoives(value);
    formik.values.moiveId = value;
    // console.log(formik.values.category);
  };
  const onChangeTime =(value  )=>{
    if(value){
      console.log("time = ",value);
      formik.values.time = value;
    }
    
  }
  const [checkMoives,setCheckMoives] = useState(options[0].value) 

  const [load,setLoad] = useState(false)
  const admin =1
  const value = 1
  const [showTimes,setShowTimes] = useState([])
  const timeNow = new Date()
  const [time,setTime] = useState("")

/// check ////////////
const [check, setCheck] = useState(1);
const [ spin,setSpin] = useState(false)
const onChange = (e) => {
  console.log('radio checked', e.target.value);
  if(e.target.value === 1){
    setTime("");
  }
  else if(e.target.value ===2){
    setTime(`${timeNow.getDate()}-${timeNow.getMonth()+1}-${timeNow.getFullYear()}`)
  }
  setCheck(e.target.value);
};


  useEffect(()=>{
    if(checkMoives !==""){
      axios.post(`https://project-datn.herokuapp.com/api/moive/moive-time?moives=${checkMoives}&time=${time}`).then((res)=>{      
          setShowTimes(res.data)
      } )
     }
     if(checkMoives ===""){
      axios.post(`https://project-datn.herokuapp.com/api/moive/moive-time?moives=&time=${time}`).then((res)=>{      
          setShowTimes(res.data)
      } )
     }
  },[load,time,checkMoives,check])
  return (
    <>
    <Spin size="large" spinning={spin} > 
    <div style={{margin:"auto", display:"flex"}}>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          width:"60%",
          paddingLeft: 10,
        }}
        onFinish={formik.handleSubmit}
      >
        
        <Form.Item label="Tên phim: ">
          <Select
            onChange={onChangeMoive}
            options={options}
            defaultValue={{
              value: options[0].value,
              key: options[0].key
            }}
           
          />
          {formik.errors.moiveId && <p class="errorMsg">{formik.errors.moiveId}</p>}
        </Form.Item>
        <OptionRoom room ={isRoom} onChangeRoom={onChangeRoom}></OptionRoom>
            <Form.Item label="Thời gian chiếu:">
            <DatePicker renderExtraFooter={() => 'extra footer'} onChange={onChangeTime} showTime />
            </Form.Item>
            {formik.errors.time && <p class="errorMsg">{formik.errors.time}</p>}
        <Form.Item label="Button">
          <Button htmlType="submit">Thêm</Button>
        </Form.Item>

         
      </Form>
      <div style={{
        width:"40%" ,
         border:"1px solid #ccc",
         paddingTop:"10px",
         paddingLeft:"20px",
         borderRadius:5
         
         } }>

      <div>  <Radio.Group name="radiogroup"  onChange={onChange} style={{marginBottom:20}} defaultValue={1}>
    <Radio value={1}>Tất cả</Radio>
    <Radio  value={2}>Chọn ngày</Radio>
    
  </Radio.Group>  
  <br></br>
      {check === 1 ?(<>
      <ShowTimeAll_Moive load={load} setLoad={setLoad} showTimes={showTimes}></ShowTimeAll_Moive>
      </>)

      :(<>
       <Booking_time value ={value} time={time} admin={admin} load={load} setTime= {setTime} showTimes={showTimes} setLoad={setLoad}></Booking_time>
      </>)}
     
      </div>
      </div>  
      </div>
      </Spin>
    </>
  );
};

export default AddShowTime;
