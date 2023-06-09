import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";

import  cloudinaryUpload from "../../../service/upload"
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
    message,
    Upload,
    Spin,
    Radio,
  } from "antd";
  
const Banner_Content = (props) => {
    const {banner, setLoad, load} = props
    console.log(banner)
    const [fileListBanner, setFileListBanner] = useState(banner?.banner?.map((item,index)=>  { 
       return {  uid: -(index+1),
        status: "done",
        url: item}
    }
    ));
    const [fileListQcRight, setFileListQcRight] = useState([ {  uid: "-1",
    status: "done",
    url: banner.qcRight}]);
    const [fileListQcLeft, setFileListQcLeft] = useState([{ 
         uid: "-1",
    status: "done",
    url: banner.qcLeft}]);
    const [fileListQcTop, setFileListQcTop] = useState([{  uid: "-2",
    status: "done",
    url: banner.qcTop}]);
  


    const formik = useFormik({
        initialValues: {
         _id: "id",
          banner: [],
          qcRight: "",
          qcLeft: "",
          qcTop:"",
        },
        validationSchema: Yup.object({
          
        }),
        onSubmit: async (values) => {
        
       
          const uploadData = new FormData();
        
            //  if(values.url !=="" ){
            //   uploadData.append("file", values.url, "file");
            //   values.image = "";
            //   values.image = await cloudinaryUpload(uploadData);
            
            //     await axios.post("http://localhost:8080/api/new/add", values)
            //       .then((res) => {
            //         console.log(res.data);
            //         message.success("Lưu thành công!");
            //         setLoad(!load)
            //         setLoading(false);
            //       })
            //       .catch((err) => {
            //         console.log(err);
            //         message.error("Lưu thất bại!");
      
            //         setLoading(false);
            //       });
            //   }  
             
          
        
        },
      });
      const onChangeBanner = async ({ fileList, file }) => {
        console.log(fileList);
        setFileListBanner(fileList);
        formik.values.url_banner =fileList?.map(file=> file.originFileObj);
      };
      const onChangeQcRight = async ({ fileList, file }) => {
        console.log(fileList);
        setFileListQcRight([file]);
        formik.values.url_qcRight =file.originFileObj
      };
      const onChangeQcLeft = async ({ fileList, file }) => {
        console.log(fileList);
        setFileListQcLeft([file]);
        formik.values.url_qcLeft =file.originFileObj
      };
      const onChangeQcTop = async ({ fileList, file }) => {
        console.log(fileList);
        setFileListQcTop([file]);
        formik.values.url_qcTop =file.originFileObj
      };
      useEffect(()=>{
        setFileListBanner(banner?.banner?.map((item,index)=>  { 
          return {  uid: -(index+1),
           status: "done",
           url: item}
       }
       ))
       setFileListQcRight([ {  uid: "-1",
       status: "done",
       url: banner.qcRight}])

       setFileListQcLeft([ {  uid: "-1",
       status: "done",
       url: banner.qcLeft}])

       setFileListQcTop([ {  uid: "-1",
       status: "done",
       url: banner.qcTop}])


      },[banner])
    return ( <>
    <Spin spinning={false}>
        <Form labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={formik.handleSubmit}
        >
        <Form.Item
            label="Banner chính"
            valuePropName="fileListBanner"
            className="img"
            // onChange={(e)=>formik.values.images.push(e.target.files[0].name) }
          >
            <Upload
              listType="picture-card"
              fileList={fileListBanner}
              onChange={onChangeBanner}
              maxCount={5}
            >
             Thay đổi
            </Upload>
          </Form.Item>
          <Form.Item
            label="Banner quảng cáo trái"
            valuePropName="fileListQcLeft"
            className="img"
            // onChange={(e)=>formik.values.images.push(e.target.files[0].name) }
          >
            <Upload
              listType="picture-card"
              fileList={fileListQcLeft}
              onChange={onChangeQcLeft}
              maxCount={1}
            >
             Thay đổi
            </Upload>
          </Form.Item>
          <Form.Item
            label="Banner quảng cáo phải"
            valuePropName="fileListQcRight"
            className="img"
            // onChange={(e)=>formik.values.images.push(e.target.files[0].name) }
          >
            <Upload
              listType="picture-card"
              fileList={fileListQcRight}
              onChange={onChangeQcRight}
              maxCount={1}
            >
             Thay đổi
            </Upload>
          </Form.Item>
          <Form.Item
            label="Banner quảng cáo trên"
            valuePropName="fileListQcLeft"
            className="img"
            // onChange={(e)=>formik.values.images.push(e.target.files[0].name) }
          >
            <Upload
              listType="picture-card"
              fileList={fileListQcTop}
              onChange={onChangeQcTop}
              maxCount={1}
            >
             Thay đổi
            </Upload>
          </Form.Item>
          <Form.Item label="Hành động:">
                <Button
                  type="primary"
                  htmlType="submit"
                  //   onClick={onChangeEdit}
                  style={{ marginRight: 200 }}
                >
               Lưu
                </Button>
            </Form.Item>
        </Form>

        </Spin>
    </> );
}
 
export default Banner_Content;