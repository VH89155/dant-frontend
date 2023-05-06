import "./register.css"
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { message } from "antd";
import {useNavigate} from "react-router-dom"

const FormRegister = () => {
  const navgate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email:"",
      confirmedPassword:"",
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
            message.success('Resgister success');
            navgate("/login")      
       }
        else {
            message.error('Resgister error');
        }
      
      })
      .catch((error)=>{
         message.error('Resgister error');
        console.log(error)
      })
      
      ;

      
    },
  });
    return ( <>
     
          <div class="card-body p-5 text-center">

            <h3 class="label-form mb-4">Đăng ký</h3>
            <form onSubmit={formik.handleSubmit}> 
            <div className="form-outline mb-4">
            <label className="form-label" for="email">Email </label>
            <input 
            type="text"
            id="email"
            name="email"
            value={
             formik.values.email
            }
            onChange={formik.handleChange}
            placeholder="Enter your email"
           
            className="form-control form-control-lg" />
           
         
            {formik.errors.email && (
          <p className="errorMsg"> {formik.errors.email} </p>
        )}
          </div>
          <div className="form-outline mb-4">
          <label className="form-label" for="form1Example23">Tên tài khoản</label>
            <input 
            type="text"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder="Enter your name"
            className="form-control form-control-lg" />
          
            {formik.errors.username && (
          <p className="errorMsg"> {formik.errors.username} </p>
        )}
          </div>

          <div className="form-outline mb-4">
          <label className="form-label" for="form1Example23">Mật khẩu</label>
         
            <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter your password"
            
            className="form-control form-control-lg" />
           
               {formik.errors.password && (
          <p className="errorMsg"> {formik.errors.password} </p>
        )}
          </div>



          <div className="form-outline mb-4">
          <label className="form-label" for="form1Example23">Nhập lại mật khẩu</label>
            <input type="password" 
            id="confirmedPassword"
            name="confirmedPassword"
            value={
               formik.values.confirmedPassword
            }
            onChange={formik.handleChange}
            placeholder="Confirm your password"
            className="form-control form-control-lg" />
          
            {formik.errors.confirmedPassword && (
          <p className="errorMsg"> {formik.errors.confirmedPassword} </p>
        )}
          
          </div>

          
            <div className="d-flex justify-content-around align-items-center mb-4">
   
            {/* <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
              <label className="form-check-label" for="form1Example3"> Remember me </label>
            </div> */}
           
          </div>

            <button class="btn-login btn btn-primary btn-lg btn-block " type="submit">Đăng ký</button>
            </form>
            <hr class="my-4"></hr>

            <button class="gg btn btn-lg btn-block btn-primary" 
              type="submit"><i class="fab fa-google me-2"></i> Đăng nhập bằng Google</button>
            <button class="fb btn btn-lg btn-block btn-primary mb-2" 
              type="submit"><i class="fab fa-facebook-f me-2"></i>Đăng nhập bằng Facebook</button>

          </div>
        {/* </div> */}
      
    </> );
}
 
export default FormRegister;