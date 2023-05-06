import { useFormik } from "formik";
import { Dayjs } from 'dayjs';

import * as Yup from "yup";
import axios from "axios";
import { Button, Form, Input, Select,DatePicker } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OptionRoom from "../../components/Admin/showtime/optionRoom";

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
      console.log(values);
      await axios.post("http://localhost:8080/api/show-time", values)
      .then((res)=>console.log(res.data) )
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
      const data = await axios.get("/api/room").then((res) => res.data.room);
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
    formik.values.moiveId = value;
    // console.log(formik.values.category);
  };
  const onChangeTime =(value  )=>{
    if(value){
      console.log("time = ",value);
      formik.values.time = value;
    }
    
  }

  // Image

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 1000,
          paddingLeft: 100,
        }}
        onFinish={formik.handleSubmit}
      >
        
        <Form.Item label="Tên phim: ">
          <Select
            // defaultValue={{
            //   value: options[0].value,
            //   name: options[0].name,
            // }}
            onChange={onChangeMoive}
            options={options}
          />
          {formik.errors.moiveId && <p class="errorMsg">{formik.errors.moiveId}</p>}
        </Form.Item>
        <OptionRoom room ={isRoom} onChangeRoom={onChangeRoom}></OptionRoom>
            <Form.Item label="Thời gian chiếu:">
            <DatePicker renderExtraFooter={() => 'extra footer'} onChange={onChangeTime} showTime />
            </Form.Item>
            {formik.errors.time && <p class="errorMsg">{formik.errors.time}</p>}
        <Form.Item label="Button">
          <Button htmlType="submit">Button</Button>
        </Form.Item>


      </Form>
    </>
  );
};

export default AddShowTime;
