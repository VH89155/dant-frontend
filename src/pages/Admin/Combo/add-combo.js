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
import { useEffect, useState } from "react";
import Table_combo from "./table-combo";
const { TextArea } = Input;


const AddCombo = () => {
    const dispatch = useDispatch()
    const [combo,setCombo] = useState([])
    const [load,setLoad]= useState(false)    
    const [loading,setLoading ] = useState(false)
    // console.log(moive)
   
      const formik = useFormik({
        initialValues: {
          _id:  "",
          name: "",
          description:"",
          images:"" ,
          price:  0 ,
        },
        validationSchema: Yup.object({
          name: Yup.string()
            .required("Required")
            .min(4, "Must be 4 characters or more"),
          description: Yup.string().required("Required"),

          price: Yup.string()
          .required("Required")
          .matches(/^-?\d*(\.\d*)?$/, "Must be a valid number"),
          
        }), 
        onSubmit: async(values) => {   
            setLoading(true)
            console.log(values);
            const uploadData = new FormData(); 
          
              uploadData.append("file", values.url,'file');  
              values.images = [];
              values.images = await cloudinaryUpload(uploadData)
              
                
          
            await axios.post("https://project-datn.herokuapp.com/api/combo/add", values)
            .then(res=>{console.log(res.data)
                message.success("Lưu thành công!")
                setLoading(false)
              
                setLoad(!load)
               
            }).catch((err)=>{
                message.error("Lưu thất bại!")
                setLoading(false)
            })
            ;
      
          },
        });
        
       
          const onChangeprice = (value) => {
            formik.values.price = value;
            console.log(formik.values.price);
          };
        

  const [fileList, setFileList ] = useState([
    // {
    //   uid: "-1",
    //   //   name: 'image.png',
    //   status: "done",
    //   url: ,
    // },
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

    useEffect(()=>{
      const fetchData = async()=>{
          await axios.get(`https://project-datn.herokuapp.com/api/combo`).then((res)=>{
             setCombo(res.data.combo) 
             console.log("combo asd", res.data.combo)
          })
      }
      fetchData()

  },[load])

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
        <Form.Item label="Tên combo: ">
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
       
        <Form.Item label="Giá tiền">
          <InputNumber
          
            id="price"
            name="price"
            min={100000}
        
            defaultValue={formik.values.price}
            onChange={onChangeprice}
          />
          {formik.errors.price && (
            <p className="errorMsg">{formik.errors.price}</p>
          )}
        </Form.Item>      
        <Form.Item
          label="Hình ảnh:"
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
          <Form.Item label="Mô tả:">
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
          <Button   htmlType="submit"  type="primary">Thêm mới</Button>
        </Form.Item>
      </Form>   
      <Table_combo combo ={combo} load={load} setLoad={setLoad}></Table_combo>
      </Spin> 
    </> 

    );
}
 
export default AddCombo;