import "./form.css"
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { message } from "antd";
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import { authLogin } from "../../../redux/apiRequest";


const FormLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
     
      password: "",
      email:"",
      
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

      // await axios.post("http://localhost:8080/api/auth/signin",values).
      // then(res=>{
      //   console.log(res.data) 
      //   return res.data})
      //   .then(res=>{
      //   if(res.success === true){
      //       message.success('Resgister success');
      //       // navgate("/login")    
           
      //  }
      //   else {
      //       message.error('Resgister error');
      //   }
      
      // })
      // .catch((error)=>{
      //    message.error('Resgister error');
      //   console.log(error)
      // })
          
      authLogin(dispatch, values, navigate);
    },
  });
      
    return ( <>
     
          <div class="card-body p-5 text-center">

            <h3 class="label-form mb-4">Đăng nhập</h3>
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

          
            <div className="d-flex justify-content-around align-items-center mb-4">
   
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
              <label className="form-check-label" for="form1Example3"> Remember me </label>
            </div>
            <a href="#!">Quên mật khẩu?</a>
          </div>

            <button class="btn-login btn btn-primary btn-lg btn-block " type="submit">Đăng nhập</button>
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
 
export default FormLogin;