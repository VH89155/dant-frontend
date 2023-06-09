import "./form.css";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { message } from "antd";


const Pass_new = (props) => {
    const {next,setNext,email,setForgot} = props

    const formik = useFormik({
        initialValues: {
        
          email:email,
          password: "",
          confirmedPassword:"",
          token :""

          
        },
        validationSchema: Yup.object({
       
            password: Yup.string()
            .required("Required")
            .matches(
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
              "Password must be 7-19 characters and contain at least one letter, one number and a special character"
            ),
          confirmedPassword: Yup.string()
            .required("Required")
            .oneOf([Yup.ref("password"), null], "Password must match"),
            token: Yup.string()
            .required("Required")
        
        }),
        onSubmit: async (values) => {
          // window.alert("Form submitted");
          console.log(values);
          await axios.post("https://project-datn.herokuapp.com/api/auth/forgot-pass/pass-new",values).then((res)=>{
          console.log(res.data)      
           if(res.data.success ===true){
                message.info(`Đổi mật khẩu thành công!`)
                setNext(!next)
                setForgot(false)
            }
            else(
                message.info("Chưa thành công")
            )
      }).catch(()=>{
        message.info("Chưa thành công")
      })
        
        },
       
      });
      const Click =()=>{
         setNext(!next)
      }
      useEffect(() => {}, [next]);
    return (

        <>
        <form style={{textAlign:"left"}} onSubmit={formik.handleSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label" style={{fontSize:18, fontWeight:500}} for="email">
              Email{" "}
            </label>
            <input
              type="text"
              id="email"
              disabled
              name="email"
              value={formik.values.email}
            //   onChange={formik.handleChange}
              placeholder="Enter your email"
              className="form-control "
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" style={{fontSize:18, fontWeight:500}} for="email">
              Mật khẩu:{" "}
            </label>
            <input
              type="password"
              id="password"
             
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Nhập mật khẩu"
              className="form-control form-control"
            />

            {formik.errors.password && (
          <p className="errorMsg"> {formik.errors.password} </p>
        )}
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" style={{fontSize:18, fontWeight:500}} for="email">
             Nhập lại mật khẩu{" "}
            </label>
            <input
              type="password"
              id="confirmedPassword"
              
              name="confirmedPassword"
              value={
                formik.values.confirmedPassword
             }
             onChange={formik.handleChange}
             placeholder="Nhập lại mật khẩu"
             className="form-control " />
           
             {formik.errors.confirmedPassword && (
           <p className="errorMsg"> {formik.errors.confirmedPassword} </p>
         )}
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" style={{fontSize:18, fontWeight:500}} for="email">
             Mã {" "}
            </label>
            <input
              type="text"
              id="token"
              
              name="token"
              value={
                formik.values.token
             }
             onChange={formik.handleChange}
             placeholder="Nhập lại mật khẩu"
             className="form-control" />
           
             {formik.errors.token && (
           <p className="errorMsg"> {formik.errors.token} </p>
         )}
          </div>

          <a href="#!" onClick={Click}>Quay lại</a>        
          <hr class="my-4"></hr>
          <button
          class="gg btn btn-block btn-primary"
         
          type="submit"
        >
            
            Lưu thay đổi 
        </button>
         </form> 
        </>
      );
}
 
export default Pass_new;