
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Form, Radio, Input,  message,Select, Checkbox} from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const From_Room = (props) => {
  const { load, edit,setName, setStatus,setLoad,name,status,category,id,setCategory } = props;
  
  const formik = useFormik({
    initialValues: {
      _id:id,
      name:name,
      category: category,
      status: status,
     
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      category: Yup.string().required("Required"),
     
    }),
    onSubmit: async (values) => {
      console.log(values);
      if(!edit){
        await axios.post("https://project-datn.herokuapp.com/api/room", values)
        .then((res)=>{
          console.log(res.data)
          if(res.data.success)message.success("Thêm thành công")
          else if(!res.data.success)  message.error(res.data.message)

          setLoad(!load)
        }).catch (()=>{
          message.error("Thêm thất bại")
        })
      }
     else  if(edit){
      await axios.put("https://project-datn.herokuapp.com/api/room", values)
      .then((res)=>{
        console.log(res.data)
        if(res.data.success)message.success("Sửa thành công")
        else if(!res.data.success)  message.error(res.data.message)

        setLoad(!load)
      }).catch (()=>{
        message.error("Sửa thất bại")
      })
      }
        
    },
  });
  const onChange = (value) => {
    console.log("display = ", value);
    formik.values.category = value;
    setCategory(value);
    
  };
  formik.values.category = category;
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
       
      <Form.Item label="Thể loại màn hình chiếu">
      <Select
            defaultValue={{
              value: category,
            }}
            value={{
              value: category,
            }}
            onChange={onChange}
          >
            <Select.Option value="2D">2D</Select.Option>
            <Select.Option value="3D">3D</Select.Option>
            
          </Select>
      </Form.Item>
      <Form.Item label="Trạng thái hoạt động:">
            <Checkbox checked={status} onChange={(e)=>{
                formik.values.status =e.target.checked
                setStatus(e.target.checked)
            }}></Checkbox>
            </Form.Item>

        <Form.Item label="Button">
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

export default From_Room;
