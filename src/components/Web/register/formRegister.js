import "./register.css"
import { useFormik } from "formik";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import * as Yup from "yup";
import { message } from "antd";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { authLoginGoogle } from "../../../redux/apiRequest";


const FormRegister = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

      await axios.post("https://project-datn.herokuapp.com/api/auth/signup",values).then(res=>res.data).then(res=>{
        if(res.success === true){
            message.success('Đăng ký thành công');
            navigate("/login")      
       }
     
        else {
            message.error(`Đăng ký thất bại ! ${res.message}`);
        }
      
      })
      .catch((error)=>{
         message.error('Đăng ký thất bại !');
        console.log(error)
      })
      
      ;

      
    },

   
  });

  const onSuccess = async(credentialResponse) => {
    // console.log(credentialResponse.credential);
    const details = jwt_decode(credentialResponse.credential);
    console.log(details);
    const user ={
      sub: details.sub,
      email: details.email,
      image: details.picture,
      fullName: `${details.family_name} ${details.given_name}`,
      username: details.email
    }
    console.log(user)

    
    
    await axios.post("https://project-datn.herokuapp.com/api/auth/auth/google-new",user).then(async(res) => {
      console.log(res.data);
      if(res.data.success) {
      await authLoginGoogle(dispatch, user, navigate)
      message.success("Đăng nhập thành công!");
    }
    else if(!res.data.success){
      message.error(res.data.message);
    }
      
   
    })
    .catch(() => {
      message.error("Đăng nhập không thành công!");
    });
    // console.log(credentialResponse);
  }
  const onFailure =(res)=>{
    console.log("login fail", res)
  }
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
            // placeholder="Nhập địa chỉ email"
           
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
            // placeholder="Nhập tên tài khoản"
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
            // placeholder="Enter your password"
            
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
            // placeholder="Confirm your password"
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

            {/* <button class="gg btn btn-lg btn-block btn-primary" 
              type="submit"><i class="fab fa-google me-2"></i> Đăng nhập bằng Google</button> */}
           <GoogleOAuthProvider  clientId="401289267989-9mb2gnrnml6ru7gfjbjq9ete1j5h0ukm.apps.googleusercontent.com">
          <GoogleLogin
         
            onSuccess={onSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          
          />
        </GoogleOAuthProvider>

          </div>
        {/* </div> */}
      
    </> );
}
 
export default FormRegister;