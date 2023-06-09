import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import cloudinaryUpload from "../../../service/upload";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
import FormItem from "antd/es/form/FormItem";

dayjs.extend(customParseFormat);
const dateFormat = "D-M-YYYY";
const Content_New = (props) => {
  const { load, loading, setLoading, data, value, setValue, setLoad } = props;
  const [newChange, setNewChange] = useState({});
  const [name, setName] = useState("");
  const [dataformik, setData] = useState("");
  const [timeNow, setTimeNow] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      name: "",
      time: `${timeNow.getDate()}-${
        timeNow.getMonth() + 1
      }-${timeNow.getFullYear()}`,
      image: "",
      data: "",
      url: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(4, "Must be 4 characters or more"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values);
      formik.values.name = name;
      formik.values.data = dataformik;
      const uploadData = new FormData();
      if (value ===1  ) {
         if(values.url !=="" ){
          uploadData.append("file", values.url, "file");
          values.image = "";
          values.image = await cloudinaryUpload(uploadData);
        
            await axios.post("https://project-datn.herokuapp.com/api/new/add", values)
              .then((res) => {
                console.log(res.data);
                message.success("Lưu thành công!");
                setLoad(!load)
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                message.error("Lưu thất bại!");
  
                setLoading(false);
              });
          }  
         
      
      } 
    else if (value === 2) {
      console.log(value.url)
      if(values.url ){
        uploadData.append("file", values.url, "file");
        values.image = "";
        values.image = await cloudinaryUpload(uploadData);
      
      }
      
        await axios.put("http://localhost:8080/api/new/edit-new", {
            id: newChange._id,
            name: formik.values.name,
            image: formik.values.image,
            data: formik.values.data,
          })
          .then((res) => {
            console.log(res.data);
            message.success("Sửa thành công!");
            setLoad(!load)
            setLoading(false);            
          })
          .catch((err) => {
            console.log(err);
            message.error("Sửa thất bại!");
            setLoading(false);
          });
      }
      else{
        message.error("Sửa thất bại!");
      }
    },
  });


  const [fileList, setFileList] = useState([]);
  const onChange = async ({ fileList: newFileList, file }) => {
    console.log(fileList);
    setFileList([file]);
    formik.values.url = file.originFileObj;
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
  };
  const onChangeDate = (date) => {
    formik.values.time = date;
    console.log("date = ", formik.values.time);
  };

  const onChangeCheck = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    setLoad(!load);
    if (e.target.value === 1) {
      console.log("check");
      setName("");
      formik.values.name = "";
      formik.values.image = "";
      formik.values.data = "";
      setData("");
      setFileList([]);
      formik.values.time = `${timeNow.getFullYear()}-${
        timeNow.getMonth() + 1
      }-${timeNow.getDate()}`;
    }
  };

  const onChangeDelete = () => {};
  const onChangeNew = (value) => {
    console.log("newid = ", value);
    const news = data.find((item) => item._id === value);
    setNewChange(news);
    const time = new Date(news.time);
    setName(news.name);
    setData(news.data);

    formik.values.name = news.name;
    formik.values.image = news.image;
    formik.values.data = news.name;
    formik.values.time = news.time;

    setFileList([
      {
        uid: "-1",

        status: "done",
        url: news.image,
      },
    ]);
  };
  useEffect(() => {}, [value,load]);
  return (
    <>
      <Spin spinning={false}>
        <Radio.Group
          onChange={onChangeCheck}
          value={value}
          style={{ marginLeft: 100, marginBottom: 50 }}
        >
          <Radio value={1}>Thêm mới</Radio>
          <Radio value={2}>Chỉnh sửa</Radio>
        </Radio.Group>

        <Select
          style={{ width: 595, marginLeft: 30 }}
          disabled={value === 1}
          onChange={onChangeNew}
        >
          {data.map((item, index) => {
            return (
              <Select.Option key={index} value={item._id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>

        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={formik.handleSubmit}
        >
          <Form.Item label="Tiêu đề bài viết: ">
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              // value={formik.values.name}
              onChange={(e) => {
                setName(e.target.value);
                formik.values.name = name;
              }}
              defaultValue={formik.values.name}
              //   value={formik.values.name}
            />
            {formik.errors.name && <p class="errorMsg">{formik.errors.name}</p>}
          </Form.Item>
          <Form.Item label="Thời gian: ">
            <DatePicker
              onChange={onChangeDate}
              onPreview={onPreview}
              //   value={dayjs(`${formik.values.time}`, dateFormat)}
              defaultValue={dayjs(`${formik.values.time}`, dateFormat)}
            />
            {formik.errors.time && <p class="errorMsg">{formik.errors.time}</p>}
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
          <Form.Item label="Description">
            <CKEditor
              style={{ with: "1000px" }}
              editor={ClassicEditor}
              data={dataformik}
              onChange={(event, editor) => {
                const data = editor.getData();
                setData(data);
                formik.values.data = dataformik;
                console.log(typeof data);
              }}
            />
          </Form.Item>
          {value === 1 ? (
            <>
              <Form.Item label="Hành động:">
                <Button type="primary" htmlType="submit">
                  Thêm mới
                </Button>
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item label="Hành động:">
                <Button
                  type="primary"
                  htmlType="submit"
                  //   onClick={onChangeEdit}
                  style={{ marginRight: 200 }}
                >
                  Sửa
                </Button>
                <Button danger type="primary" onClick={onChangeDelete}>
                  Xóa
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Spin>
    </>
  );
};

export default Content_New;
