
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Form, Radio, Input,  message,Select, Checkbox,InputNumber} from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const From_PriceTicket = (props) => {
  const { load, edit,setName,setLoad, setStatus,name,status,id,setPriceTime12,setPriceTime12_17,setPriceTime17_23,setPriceTime23 ,priceTime12,priceTime12_17,priceTime17_23,priceTime23  } = props;
  console.log("edit", edit)
  const formik = useFormik({
    initialValues: {
      _id:id,
      name:name,
      gia12:priceTime12,
      gia12_17:priceTime12_17,
      gia17_23:priceTime17_23,
      gia23:priceTime23,
      status: status,
     
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      gia12: Yup.string().required("Required"),
      gia12_17: Yup.string().required("Required"),
      gia17_23: Yup.string().required("Required"),
      gia23: Yup.string().required("Required"),
     
    }),
    onSubmit: async (values) => {
      console.log(values);
      if(!edit){
        await axios.post("https://project-datn.herokuapp.com/api/price-ticket", {
            "name": values.name,
            "price_time":[
                {
                    "time": "0-12",
                    "price":values.gia12
                }, {
                    "time": "12-17",
                    "price":values.gia12_17
                } 
                ,{
                    "time": "17-23",
                    "price":values.gia17_23
                }, 
                {
                    "time": "23",
                    "price":values.gia23
                }
            ]
        })
        .then((res)=>{
          console.log(res.data)
          if(res.data.success)message.success("Thêm thành công")
          else if(!res.data.success)  message.error(res.data.message)

          setLoad(!load)
        }).catch (()=>{
          message.error("Thêm thất bại")
        })
      }
    //  else  if(edit){
    //   await axios.put("http://localhost:8080/api/room", values)
    //   .then((res)=>{
    //     console.log(res.data)
    //     if(res.data.success)message.success("Sửa thành công")
    //     else if(!res.data.success)  message.error(res.data.message)

    //     setLoad(!load)
    //   }).catch (()=>{
    //     message.error("Sửa thất bại")
    //   })
    //   }
        
    },
  });
//   const onChange = (value) => {
//     console.log("display = ", value);
//     formik.values.category = value;
//     setCategory(value);
    
//   };
console.log(id)

  formik.values.gia12 = priceTime12;
  formik.values.gia12_17 = priceTime12_17;
  formik.values.gia17_23 = priceTime17_23;
  formik.values.gia23 = priceTime23;
  formik.values._id=id
  formik.values.name = name
  formik.values.status = status

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
          width: "100%",
          paddingLeft: 10,
        }}
        onFinish={formik.handleSubmit}
      >
        <Form.Item label="Tên phòng chiếu: ">
          <Input
            type="text"
            id="name"
            name="name"

            value={name}
            onChange={(e) => {
              formik.values.name = e.target.value;
              setName(e.target.value);
            }}
           
          />
          {formik.errors.name && <p class="errorMsg">{formik.errors.name}</p>}
        </Form.Item>
       
      <Form.Item label="Gía vé trước 12h">
      <InputNumber
         
         id="gia12"
         name="gia12"
         min={1}
         value={priceTime12}
         onChange={(e) => {
            formik.values.gia12 = e;
            setPriceTime12(e);
         }}
       />
       {formik.errors.gia12 && (
         <p className="errorMsg">{formik.errors.gia12}</p>
       )}
      </Form.Item>

      <Form.Item label="Gía vé 12h - 17h">
      <InputNumber
        value={priceTime12_17}
         id="gia12_17"
         name="gia12_17"
         min={1}
        
         onChange={(e) => {
            formik.values.gia12_17 = e;
            setPriceTime12_17(e);
         }}
       />
       {formik.errors.gia12_17 && (
         <p className="errorMsg">{formik.errors.gia12_17}</p>
       )}
      </Form.Item>


      <Form.Item label="Gía vé 17h - 23h">
      <InputNumber
          value={priceTime17_23}
         id="gia17_23"
         name="gia17_23"
         min={1}
        
         onChange={(e) => {
            formik.values.gia17_23 = e;
            setPriceTime17_23(e);
         }}
       />
       {formik.errors.gia17_23 && (
         <p className="errorMsg">{formik.errors.gia17_23}</p>
       )}
      </Form.Item>

      <Form.Item label="Gía vé sau 23h">
      <InputNumber
          value={priceTime23}
         id="gia23"
         name="gia23"
         min={1}
        
         onChange={(e) => {
            formik.values.gia23 = e;
            setPriceTime23(e);
         }}
       />
       {formik.errors.gia23 && (
         <p className="errorMsg">{formik.errors.gia23}</p>
       )}
      </Form.Item>
      <Form.Item label="Trạng thái hoạt động:">
            <Checkbox checked={status} onChange={(e)=>{
                formik.values.status =e.target.checked
                setStatus(e.target.checked)
            }}></Checkbox>
            </Form.Item>

        <Form.Item label="Thực hiện">
          {
            edit? <>
              <Button type="primary" htmlType="submit">Lưu</Button>
            </>
            
            :<>
              <Button type="primary" htmlType="submit">Thêm</Button>
            </>
          }
        
        </Form.Item>
      </Form>
    </>
  );
};

export default From_PriceTicket;
