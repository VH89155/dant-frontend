
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Form, Button, Input ,message} from "antd";

const FormEditPass = (props) => {
   const {auth,load,setLoad} = props ;
   const formik = useFormik({
    initialValues: {
      _id:  auth?.currentUser?.info._id ?? "" ,  
      currentPass :  "",
      confirmedPassword:"",
      newPass: "",
      
    },
    validationSchema: Yup.object({
        currentPass: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Password must be 7-19 characters and contain at least one letter, one number and a special character"
        ),
       newPass: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Password must be 7-19 characters and contain at least one letter, one number and a special character"
        ),
        confirmedPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("newPass"), null], "Password must match"),
        currentPass: Yup.string().required("Required"), 
    }),
    onSubmit: async (values) => {
      // window.alert("Form submitted");
      console.log(values);
      await axios.post("/api/auth/auth/resset-pass", values)
      .then(res=>{
        console.log(res.data);
        if(res.data.success){
            message.success("Thành công")
            setLoad(!load)
        }
        else{
            message.success("Không thành công")
            // setLoad(!load)  
        }
       
       
      }).catch((err) => console.log(err));

    
    }})
    
    return ( <>
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
        onFinish={formik.handleSubmit} >

        <Form.Item label="Mật khẩu cũ: ">
          <Input
            type="password"
            id="currentPass"
            name="currentPass"
            // value={formik.values.name}

            onChange={(e)=>{
              formik.values.currentPass=e.target.value;
            }}
            // placeholder="Enter your name"
          />
          {formik.errors.currentPass && <p class="errorMsg">{formik.errors.currentPass}</p>}
        </Form.Item>
        <Form.Item label="Mật khẩu mới: ">
          <Input
            type="password"
            id="newPass"
            name="newPass"
            // value={formik.values.name}

            onChange={(e)=>{
              formik.values.newPass=e.target.value;
            }}
            // placeholder="Enter your name"
          />
          {formik.errors.newPass && <p class="errorMsg">{formik.errors.newPass}</p>}
        </Form.Item>
        <Form.Item label="Nhập lại mâtk khẩu: ">
          <Input
            type="password"
            id="confirmedPassword"
            name="confirmedPassword"
            // value={formik.values.name}

            onChange={(e)=>{
              formik.values.confirmedPassword=e.target.value;
            }}
            // placeholder="Enter your name"
          />
          {formik.errors.confirmedPassword && <p class="errorMsg">{formik.errors.confirmedPassword}</p>}
        </Form.Item>
        <Form.Item label="Button">
          <Button   htmlType="submit"  type="primary">Lưu  </Button>
        </Form.Item>
     </Form>
    </> );
}
 
export default FormEditPass;