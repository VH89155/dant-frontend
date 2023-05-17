import "./style.css";
import { useFormik } from "formik";
import { Dayjs } from "dayjs";
import * as Yup from "yup";
import axios from "axios";
import { Button, Form, Radio, Input, Checkbox, DatePicker, message,InputNumber } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';


const { TextArea } = Input;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-M-D';

dayjs.extend(customParseFormat);

const Edit_Discount = (props) => {
    const {discount, load, setLoad} = props
    const timeStart = new Date(discount.start_time)
    const timeEnd = new Date(discount.end_time)
    const formik = useFormik({
        initialValues: {
          id: discount._id,
          name: discount.name,
          discount_value: discount.discount_value,
          start_time:(discount.start_time),
          end_time: ( discount.end_time),
          description: discount.description,
          only_once: discount.only_once,
          quantity: discount.quantity,
          minimum_quantity: discount.minimum_quantity ?? null,
          minimum_price: discount.minimum_price ?? null,
        },
        validationSchema: Yup.object({
          name: Yup.string().required("Required"),
          discount_value: Yup.string().required("Required"),
          start_time: Yup.date().required("Required Date"),
          end_time: Yup.date().required("Required Date"),
        }),
        onSubmit: async (values) => {
          console.log(values);
            await axios.put(`/api/discount/edit`, values)
            .then((res)=>{
              console.log(res.data)
              if(res.data.success)message.success("Sửa thành công")
              else if(!res.data.success)  message.error("Không thành công")   
              setLoad(!load)
            }).catch (()=>{
              message.error("Sửa thất bại")
            })
        },
      });
    
      const onChangeDate = (value, dateString) => {
        console.log("Selected Time: ", value);
        console.log("Formatted Selected Time: ", dateString);
      };
      const onOk = (value) => {
        console.log("onOk: ", value)
        formik.values.start_time = value[0]
        formik.values.end_time = value[1]
      };
   
   
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
        <Form.Item label="Mã code giảm giá: ">
          <Input
            type="text"
            id="name"
            name="name"
            defaultValue={formik.values.name}
            // value={formik.values.name}
            onChange={(e) => {
              formik.values.name = e.target.value;
            }}
            placeholder="Enter your name"
          />
          {formik.errors.name && <p class="errorMsg">{formik.errors.name}</p>}
        </Form.Item>
       
        <Form.Item label="Giá trị giảm giá: ">
          <Input
            type="text"
            id="discount_value"
            name="discount_value"
            defaultValue={formik.values.discount_value}
            // value={formik.values.discount_value}
            onChange={(e) => {
              formik.values.discount_value = e.target.value;
            }}
            placeholder="Enter your discount_value"
          />
          {formik.errors.discount_value && <p class="errorMsg">{formik.errors.discount_value}</p>}
        </Form.Item>
        <Form.Item label="Số lượng mã ">
          <InputNumber 
            id="quantity"
            name="quantity"
            defaultValue={formik.values.quantity}
            min={0}
            onChange={(value) => {
              formik.values.quantity = value;
            }}
          />
          {formik.errors.quantity && (
            <p className="errorMsg">{formik.errors.quantity}</p>
          )}
        </Form.Item>
        <Form.Item label="Số vé tối thiểu">
          <InputNumber
            id="minimum_quantity"
            name="minimum_quantity"
            defaultValue={formik.values.minimum_quantity}
            min={0}
            onChange={(value) => {
              formik.values.minimum_quantity = value;
            }}
          />
          {formik.errors.minimum_quantity && (
            <p className="errorMsg">{formik.errors.minimum_quantity}</p>
          )}
        </Form.Item>
        <Form.Item label="Số tiền tối thiểu:">
          <InputNumber
            id="minimum_price"
            name="minimum_price"
            defaultValue={formik.values.minimum_price}
            min={0}
            onChange={(value) => {
              formik.values.minimum_price = value;
            }}
          />
          {formik.errors.minimum_price && (
            <p className="errorMsg">{formik.errors.minimum_price}</p>
          )}
        </Form.Item>
        <Form.Item label="Hạn sử dụng:">
          <RangePicker
            // showTime={{
            //   format: "HH:mm",
            // }}
            // format="YYYY-MM-DD HH:mm"
            onChange={onChangeDate}
            defaultValue={[dayjs(`${timeStart.getFullYear()}-${timeStart.getMonth()+1} -${timeStart.getDate()}}`, dateFormat), dayjs(`${timeEnd.getFullYear()}-${timeEnd.getMonth()+1} -${timeEnd.getDate()}}`, dateFormat)]}
            onOk={onOk}
          />
        </Form.Item>
        {formik.errors.time && <p class="errorMsg">{formik.errors.time}</p>}
            <Form.Item label="Chỉ một lần:">

            <Checkbox checked={formik.values.only_once} onChange={(e)=>{
                
                formik.values.only_once =e.target.checked
            }}></Checkbox>
            </Form.Item>
        <Form.Item label="Description">
          <TextArea
            rows={3}
            id="description"
            name="description"
            defaultValue={formik.values.description}
            onChange={(e) => {
              formik.values.description = e.target.value;
            }}
            placeholder="Enter your description"
          />
          {formik.errors.description && (
            <p class="errorMsg">{formik.errors.description}</p>
          )}
        </Form.Item>

        <Form.Item label="Button">
          <Button type="primary" htmlType="submit">Sửa </Button>
        </Form.Item>
      </Form>
        </>
     );
}
 
export default Edit_Discount;