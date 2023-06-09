import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Form, Input, Select, DatePicker ,message} from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OptionRoom from "./optionRoom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const dateFormat = `YYYY-MM-DD HH:mm:ss Z`;

const Edit_showtime = (props) => {
  const { showTime, moive, room ,load,setLoad, setEdit} = props;
  const formik = useFormik({
    initialValues: {
      moiveId: moive._id,
      roomId: room._id,
      time: showTime.time,
      showTimeID: showTime._id,
    },
    validationSchema: Yup.object({
      moiveId: Yup.string().required("Required"),
      roomId: Yup.string().required("Required"),
      time: Yup.date().required("Required Date"),
    }),
    onSubmit: async (values) => {
      console.log(values);
        await axios.put("https://project-datn.herokuapp.com/api/show-time", values)
        .then((res)=>{
            if(res.data.statusError !== "")
            message.error(`Không thành công : ${res.data.statusError}`)
            else{
            setLoad(!load)
            setEdit(false)
            message.success("Thành công")
            }
        } )
        .catch(()=>{
            message.error("Không thành công :" )
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
  const [isRoom, setRoom] = useState([]);
 
  const onChangeRoom = (value) => {
    console.log("room = ", value);
    formik.values.roomId = value;
  };
  const onChangeMoive = (value) => {
    console.log("Moive= ", value);
    formik.values.moiveId = value;
    // console.log(formik.values.category);
  };
  const onChangeTime = (value) => {
    if (value) {
      console.log("time = ", value);
      formik.values.time = value;
    }
  };
 useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("https://project-datn.herokuapp.com/api/room").then((res) => res.data.room);
      setRoom(
        data.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        })
      );
    };
    fetchData();
  }, [showTime]);
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
           
            onChange={onChangeMoive}
            options={options}
            defaultValue={moive.name}
          />
          {formik.errors.moiveId && (
            <p class="errorMsg">{formik.errors.moiveId}</p>
          )}
        </Form.Item>
        <OptionRoom
          room={isRoom}
          romdefault={room}
          onChangeRoom={onChangeRoom}
        ></OptionRoom>
        <Form.Item label="Thời gian chiếu:">
          <DatePicker
            defaultValue={dayjs(showTime.time, dateFormat)}
            onChange={onChangeTime}
            showTime
          />
        </Form.Item>
        {formik.errors.time && <p class="errorMsg">{formik.errors.time}</p>}
        <Form.Item label="Button">
          <Button htmlType="submit">Button</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Edit_showtime;
