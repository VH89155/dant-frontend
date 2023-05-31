import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import cloudinaryUpload from "../../../service/upload";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
 
} from "antd";
import { useState } from "react";
const { RangePicker } = DatePicker;
const { TextArea } = Input;




const AddMoive = () => {
  const options = [
    { label: "Hành động", value: "Hành động" },
    { label: "Tình cảm", value: "Tình cảm" },
    { label: "Tâm lí", value: "Tâm lí" },
    { label: "Viễn tưởng", value: "Viễn tưởng" },
    { label: "Khoa học", value: "Khoa học" },
    { label: "Võ thuật", value: "Võ thuật" },
    { label: "Cổ trang", value: "Cổ trang" },
    { label: "Kinh dị", value: "Kinh dị" },
    { label: "Hài", value: "Hài " },
  ];


  
  const handleFileUploadImg= async (e) => {
    formik.values.fileImage = e.target.files[0]
    }

  const handleFileUploadVideo= async (e) => {
    formik.values.video = e.target.files[0]
       
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      premiere_date: Date.now(),
      time: 0,
      category: [],
      director: "",
      performer: [],
      file: [],
      age: 0,
      trailer: "",
      rating: 10,
      origin: "VietNam",
      display_technology:"2D"
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(4, "Must be 4 characters or more"),
      description: Yup.string().required("Required"),
      category: Yup.array().required("Required"),
      rating: Yup.string()
      .required("Required")
      .matches(/^-?\d*(\.\d*)?$/, "Must be a valid number"),
      time: Yup.string()
      .required("Required")
      .matches(/^-?\d*(\.\d*)?$/, "Must be a valid number"),
      premiere_date: Yup.date().required("Required Date"),
      director: Yup.string()
        .required("Required")
        .min(4, "Must be 4 characters or more"),
      performer: Yup.array().required("Must be a performer"),
      // images: Yup.array().required("Required").min(1, ""),
      age: Yup.string()
      .required("Required"),
      
      trailer: Yup.string().required("Required"),
      origin: Yup.string().required("Required"),
    }), 
    onSubmit: async(values) => {
    
      console.log(values);
      const uploadData = new FormData();
  
      uploadData.append("file", values.fileImage,'file');  
      values.file = [];
      values.file.push(await cloudinaryUpload(uploadData));
      // uploadData1.append("file", values.video,'file');  
     
      // values.trailer= await cloudinaryUpload(uploadData1);

      await axios.post("http://localhost:8080/api/moive/add-moive",values)
      .then(res=>console.log(res.data)).catch((err)=>console.log(err))
      ;

      
      
      // values.file.push(data.secure_url);
      // await axios.post("/localhost:8080/api/moive/add-moive",values);
      
      
      
      // await axios.post("/api/upload",values.file[0])
      // .then((res)=>console.log(res.data))
      // .catch((err)=>console.log(err))
      // addProduct(dispatch, values);

      // message.success("Thêm thành công!");
    },
  });

  const onChangeAge = (value) => {
    console.log("age = ", value);
    formik.values.age = value;
    
  };
  const onChangeDisplay = (value) => {
    console.log("display = ", value);
    formik.values.display_technology = value;
    
  };
  const onChangeCategory = (values) => {
    formik.values.category = values;
    console.log("select = ", formik.values.category);
  };
  const onChangeDate = (date) => {
   
    formik.values.premiere_date = date;
    console.log("date = ", formik.values.premiere_date);
  };
  const onChangePerformer = (values) => {
    console.log("select = ", values);
    formik.values.performer = values;
  };
  const onChangeTime = (value) => {
    formik.values.time = value;
    console.log(formik.values.time);
  };
  const onChangerating = (value) => {
    formik.values.rating = value;
    console.log(formik.values.rating);
  };

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
          <Input
            type="text"
            id="name"
            name="name"
            // value={formik.values.name}
            onChange={(e)=>{
              formik.values.name=e.target.value;
            }}
            placeholder="Enter your name"
          />
          {formik.errors.name && <p class="errorMsg">{formik.errors.name}</p>}
        </Form.Item>
        <Form.Item label="Đạo diễn: ">
          <Input
            type="text"
            id="director"
            name="director"
            onChange={(e)=>{
              formik.values.director=e.target.value;
            }}
            placeholder="Enter your director"
          />
          {formik.errors.director && (
            <p class="errorMsg">{formik.errors.director}</p>
          )}
        </Form.Item>

        <Form.Item label="Diễn viên: ">
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            onChange={onChangePerformer}
            tokenSeparators={[","]}
          />
          {formik.errors.performer && (
            <p class="errorMsg">{formik.errors.performer}</p>
          )}
        </Form.Item>

    
         <Form.Item label="Thể loại">
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select"
            onChange={onChangeCategory}
            options={options}
          />
          {formik.errors.category && (
            <p class="errorMsg">{formik.errors.category}</p>
          )}
        </Form.Item> 

         <Form.Item label="Độ tuổi: ">
          <Select
            defaultValue={{
              value: "12+",
            }}
            onChange={onChangeAge}
          >
            <Select.Option value="6+">6+</Select.Option>
            <Select.Option value="12+">12+</Select.Option>
            <Select.Option value="16+">16+</Select.Option>
            <Select.Option value="18+">18+</Select.Option>
          </Select>
         
        </Form.Item>
        <Form.Item label="Loại màn hình: ">
          <Select
            defaultValue={{
              value: "2D",
            }}
            onChange={onChangeDisplay}
          >
            <Select.Option value="2D">2D</Select.Option>
            <Select.Option value="3D">3D</Select.Option>
            
          </Select>
          </Form.Item>
        <Form.Item label="Ngày chiếu">
          <DatePicker onChange={onChangeDate} />
          {formik.errors.premiere_date && <p class="errorMsg">{formik.errors.premiere_date}</p>}
        </Form.Item>

        <Form.Item label="Thời lượng phim">
          <InputNumber
         
            id="time"
            name="time"
            min={1}
           
            onChange={onChangeTime}
          />
          {formik.errors.time && (
            <p className="errorMsg">{formik.errors.time}</p>
          )}
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
          
            id="rating"
            name="rating"
            min={1}
            max={10}
          
            onChange={onChangerating}
          />
          {formik.errors.rating && (
            <p className="errorMsg">{formik.errors.rating}</p>
          )}
        </Form.Item>
        <Form.Item label="Trailer: ">
          <Input
            type="text"
            id="trailer"
            name="trailer"
            onChange={(e)=>{
              formik.values.trailer=e.target.value;
            }}
            placeholder="Enter your trailer"
          />
          {formik.errors.trailer && <p class="errorMsg">{formik.errors.trailer}</p>}
        </Form.Item>
        <Form.Item label="Xuất xứ: ">
          <Input
            type="text"
            id="origin"
            name="origin"
            onChange={(e)=>{
              formik.values.origin=e.target.value;
            }}
            placeholder="Enter your name"
          />
          {formik.errors.origin && <p class="errorMsg">{formik.errors.origin}</p>}
        </Form.Item> 
        <Form.Item
          label="Upload Image"
          valuePropName="fileList"
          className="img"
          // onChange={(e)=>formik.values.images.push(e.target.files[0].name) }
        >
         <input 
          type="file"
         
          onChange={(e) => handleFileUploadImg(e)}>
         </input>
        </Form.Item>
       
          <Form.Item label="Description">
          <TextArea
            rows={3}
            id="description"
            name="description"
            onChange={(e)=>{
              formik.values.description=e.target.value;
              
            }}
            placeholder="Enter your description"
           
          />
           {formik.errors.description && <p class="errorMsg">{formik.errors.description}</p>}
        </Form.Item>
        
        <Form.Item label="Button">
          <Button   htmlType="submit"  type="primary">Thêm </Button>
        </Form.Item>
      </Form>    
      {/* <CKEditor  style={{height:"200px"}}
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    // onReady={ editor => {
                    //     // You can store the "editor" and use when it is needed.
                    //     console.log( 'Editor is ready to use!', editor );
                    // } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        console.log(typeof(data))
                    } }
                    // onBlur={ ( event, editor ) => {
                    //     console.log( 'Blur.', editor );
                    // } }
                    // onFocus={ ( event, editor ) => {
                    //     console.log( 'Focus.', editor );
                    // } }
                /> */}
    </>
  );
};

export default AddMoive;
