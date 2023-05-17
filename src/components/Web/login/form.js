import "./form.css";
import { useFormik } from "formik";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";
import * as Yup from "yup";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, authLoginGoogle } from "../../../redux/apiRequest";
import { useEffect, useState } from "react";


const FormLogin = (props) => {
 
  const { forgot, setForgot } = props;
  const auth = useSelector((state) => state?.auth?.login?.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: async (values) => {
      // window.alert("Form submitted");
      console.log(values);

      await authLogin(dispatch, values, navigate);
      await axios
        .post("http://localhost:8080/api/auth/signin", values)
        .then((res) => {
          console.log(res);
          message.success("Đăng nhập thành công!");
        })
        .catch(() => {
          message.error("Đăng nhập không thành công!");
        });
    },
  });


  const onChangeForgot = () => {
    setForgot(!forgot);
  };
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

    
    
    await axios.post("/api/auth/auth/google-new",user).then(async(res) => {
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
  const handleFacebookLogin = () => {
    window.FB.login(function(response) {
      if (response.authResponse) {
        console.log('Đăng nhập thành công!', response);
      } else {
        console.log('Đăng nhập không thành công!');
      }
    })}



  useEffect(() => {}, [auth]);
  return (
    <>
      <div class="card-body p-5 text-center">
        <h3 class="label-form mb-4">Đăng nhập</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label" for="email">
              Email{" "}
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Enter your email"
              className="form-control form-control-lg"
            />

            {formik.errors.email && (
              <p className="errorMsg"> {formik.errors.email} </p>
            )}
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" for="form1Example23">
              Mật khẩu
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Enter your password"
              className="form-control form-control-lg"
            />

            {formik.errors.password && (
              <p className="errorMsg"> {formik.errors.password} </p>
            )}
          </div>

          <div className="d-flex justify-content-around align-items-center mb-4">
            {/* <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
              <label className="form-check-label" for="form1Example3"> Remember me </label>
            </div> */}
            <a href="#!" onClick={onChangeForgot}>
              Quên mật khẩu?
            </a>
          </div>

          <button
            class="btn-login btn btn-primary btn-lg btn-block "
            type="submit"
          >
            Đăng nhập
          </button>
        </form>
        <hr class="my-4"></hr>

        <div  style={{textAlign:"center"}} >
         <GoogleOAuthProvider  clientId="401289267989-9mb2gnrnml6ru7gfjbjq9ete1j5h0ukm.apps.googleusercontent.com">
          <GoogleLogin
         
            onSuccess={onSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          
          />
        </GoogleOAuthProvider>
        </div>
        <button class="fb btn btn-lg btn-block btn-primary mb-2" >
          <i class="fab fa-facebook-f me-2"></i>Đăng nhập bằng Facebook
        </button>
        
        {/* <GoogleLogin  
        clientId="401289267989-9mb2gnrnml6ru7gfjbjq9ete1j5h0ukm.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
        /> */}

{/* <FacebookLogin
    appId="1682720185497780"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook}
    cssClass="my-facebook-button-class"
    icon="fa-facebook"
  /> */}
      
      </div>
      {/* </div> */}

      
 
    </>
  );
};

export default FormLogin;
