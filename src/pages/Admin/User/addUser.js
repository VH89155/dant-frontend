
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Form, Button, Input ,message,Checkbox} from "antd";


const FormAddUser = (props) => {
   const {auth,load,setLoad} = props ;
   const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email:"",
      confirmedPassword:"",
      admin: false
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Required")
        .min(4, "Must be 4 characters or more"),
      email: Yup.string()
        .required("Required")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Password must be 7-19 characters and contain at least one letter, one number and a special character"
        ),
      confirmedPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: async (values) => {
      // window.alert("Form submitted");
      console.log(values);

      await axios.post("http://localhost:8080/api/auth/signup",values).then(res=>res.data).then(res=>{
        if(res.success === true){
            message.success('Thêm tài khoản thành công');
         
       }
        else {
            message.error('Thêm tài khoản không thành công');
        }
      
      })
      .catch((error)=>{
         message.error('Không thành công');
        console.log(error)
      })
      
      ;

      
    },
  });
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    formik.values.admin = e.target.checked;
  };
    
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
        <Form.Item label="Địa chỉ email">
        <Input type="text"
            id="email"
            name="email"
            value={
             formik.values.email
            }
            onChange={formik.handleChange}
            placeholder="Nhập địa chỉ email">
        </Input>    
        {formik.errors.email && (
          <p className="errorMsg"> {formik.errors.email} </p>)}
        </Form.Item>
        <Form.Item label="Tên tài khoản">
        <Input type="text"
            id="username"
            name="username"
            value={
             formik.values.username
            }
            onChange={formik.handleChange}
            placeholder="Nhập tên tài khoản">
        </Input>    
        {formik.errors.username && (
          <p className="errorMsg"> {formik.errors.username} </p>)}
        </Form.Item>

        <Form.Item label="Mật khẩu ">
          <Input
             type="password"
             id="password"
             name="password"
             value={formik.values.password}
             onChange={formik.handleChange}
             placeholder="Nhập mật khẩu"
          />
          {formik.errors.password && <p class="errorMsg">{formik.errors.password}</p>}
        </Form.Item>
        <Form.Item label="Nhập lại mật khẩu ">
          <Input
            type="password" 
            id="confirmedPassword"
            name="confirmedPassword"
            value={
               formik.values.confirmedPassword
            }
            onChange={formik.handleChange}
            placeholder="Nhập lại mật khẩu"
          />
          {formik.errors.confirmedPassword && <p class="errorMsg">{formik.errors.confirmedPassword}</p>}
        </Form.Item>
          <Form.Item label="Là quản trị">
          <Checkbox onChange={onChange}></Checkbox>
            </Form.Item>  
        <Form.Item label="Button">
          <Button   htmlType="submit"  type="primary">Thêm mới </Button>
        </Form.Item>
     </Form>
    </> );
}
 
export default FormAddUser;