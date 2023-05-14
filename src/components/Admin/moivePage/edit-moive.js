import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import cloudinaryUpload from "../../../service/upload";
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    message,
    Upload,
    Spin
   
  } from "antd";
  import dayjs from 'dayjs';
  import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from "react";
import { getAllMoive } from "../../../redux/apiRequest";
const { TextArea } = Input;

dayjs.extend(customParseFormat);
const dateFormat = 'D-M-YYYY';

const EditMoive = (props) => {
    const dispatch = useDispatch()
    const {moive ,load, setLoad} = props;
    const [loading,setLoading ] = useState(false)
    // console.log(moive)
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
        { label: "Phiêu lưu", value: "Phiêu lưu" },
        // { label: "Hài", value: "Hài " },
      ];
      const formik = useFormik({
        initialValues: {
          _id: moive._id,
          name: moive.name,
          description:moive.description,
          premiere_date: moive.timeReal,
          time: moive.time,
          category: moive.category,
          director: moive.director,
          performer: moive.performer,
          images:moive.images ,
          age: moive.age,
          trailer: moive.trailer,
          rating: moive.rating,
          origin: moive.origin,
          url:null,
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
        //   premiere_date: Yup.date().required("Required Date"),
          director: Yup.string()
            .required("Required")
            .min(4, "Must be 4 characters or more"),
          performer: Yup.array().required("Must be a performer"),
          age: Yup.string()
          .required("Required"),
          
          trailer: Yup.string().required("Required"),
          origin: Yup.string().required("Required"),
        }), 
        onSubmit: async(values) => {   
            setLoading(true)
            console.log(values);
            const uploadData = new FormData(); 
            if(values.url && moive.images[0] !== fileList[0].url ){
              uploadData.append("file", values.url,'file');  
              values.images = [];
              values.images.push(await cloudinaryUpload(uploadData));
              
            }      
          
            await axios.put("http://localhost:8080/api/moive/edit-moive", values)
            .then(res=>{console.log(res.data)
                message.success("Lưu thành công!")
                setLoading(false)
                getAllMoive(dispatch)
                setLoad(!load)
               
            }).catch((err)=>{
                message.error("Lưu thất bại!")
                setLoading(false)
            })
            ;
      
          },
        });

        const onChangeAge = (value) => {
            console.log("age = ", value);
            formik.values.age = value;
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
        

  const [fileList, setFileList ] = useState([
    {
      uid: "-1",
      //   name: 'image.png',
      status: "done",
      url: moive.images[0],
    },
  ])
  const onChange = async ({ fileList: newFileList, file }) => {
    console.log( fileList);
    setFileList( [file]);
    formik.values.url = file.originFileObj
   
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
}
  

    return ( 
    <>
    <Spin spinning={loading} >
        
      
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
           defaultValue={formik.values.name}
          />
          {formik.errors.name && <p class="errorMsg">{formik.errors.name}</p>}
        </Form.Item>
        <Form.Item label="Đạo diễn: ">
          <Input
            type="text"
            id="director"
            name="director"
            defaultValue={formik.values.director}
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
            defaultValue={formik.values.performer}
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
            defaultValue={formik.values.category}
          />
          {formik.errors.category && (
            <p class="errorMsg">{formik.errors.category}</p>
          )}
        </Form.Item> 

         <Form.Item label="Độ tuổi: ">
          <Select
            defaultValue={{
              value: formik.values.age,
            }}
            onChange={onChangeAge}
          >
            <Select.Option value="6+">6+</Select.Option>
            <Select.Option value="12+">12+</Select.Option>
            <Select.Option value="16+">16+</Select.Option>
            <Select.Option value="18+">18+</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Ngày chiếu">
          <DatePicker onChange={onChangeDate} 
          onPreview={onPreview}
          defaultValue={dayjs(moive.premiere_date, dateFormat)}  />
          {formik.errors.premiere_date && <p class="errorMsg">{formik.errors.premiere_date}</p>}
        </Form.Item>

        <Form.Item label="Thời lượng phim">
          <InputNumber
         
            id="time"
            name="time"
            min={1}
            defaultValue={formik.values.time}
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
            defaultValue={formik.values.rating}
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
            defaultValue={formik.values.trailer}
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
            defaultValue={formik.values.origin}
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
          <Upload

                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}                
                  maxCount={1}
                >
                  {fileList.length < 5 && "+ Thay đổi"}
         </Upload>
        </Form.Item>
        {/* <Form.Item
          label="Upload Video"
          // valuePropName="fileList"
          className="video"
          // onChange={(e)=>formik.values.images.push(e.target.files[0].name) }
        >
         <input 
          type="file"
         
          onChange={(e) => handleFileUploadVideo(e)}>
         </input>
        </Form.Item> */}
          <Form.Item label="Description">
          <TextArea
            rows={3}
            id="description"
            name="description"
            onChange={(e)=>{
              formik.values.description=e.target.value;
              
            }}
            placeholder="Enter your description"
            defaultValue={formik.values.description}
          />
           {formik.errors.description && <p class="errorMsg">{formik.errors.description}</p>}
        </Form.Item>
        
        <Form.Item label="Button">
          <Button   htmlType="submit" >Lưu</Button>
        </Form.Item>
      </Form>   
      </Spin> 
    </> 
  
    );
}
 
export default EditMoive;