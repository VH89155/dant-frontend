import "./form.css";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { message } from "antd";
import Pass_new from "./pass-new";
const Forgot_Pass = (props) => {
  const { forgot, setForgot } = props;
  const [ next, setNext] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
    }),
    onSubmit: async (values) => {
      // window.alert("Form submitted");
      console.log(values);
      await axios
        .post("http://localhost:8080/api/auth/forgot-pass/sendemail", values)
        .then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            message.info(`Đã gửi email về ${values.email}`)
            setNext(!next);
          } else if (res.data.success !== true) message.info("Chưa thành công");
        })
        .catch((err) => {
            console.log(err);
            if(err)
           {  message.info("Chưa thành công ! ");}
        });
    },
  });
  const Click = () => {
    setForgot(!forgot);
  };
  useEffect(() => {}, [next, forgot]);
  return (
    <>
      <div class="card-body p-5 text-center">
        <h3 class="label-form mb-4">Quên mật khẩu</h3>

        {next ? (
          <>
            <Pass_new
              next={next}
              forgot={forgot}
              setForgot={setForgot}
              setNext={setNext}
              email={formik.values.email}
            ></Pass_new>
          </>
        ) : (
          <>
            <form style={{ textAlign: "left" }} onSubmit={formik.handleSubmit}>
              <div className="form-outline mb-4">
                <label
                  className="form-label"
                  style={{ fontSize: 18, fontWeight: 500 }}
                  for="email"
                >
                  Email{" "}
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Enter your email"
                  className="form-control form-control"
                />

                {formik.errors.email && (
                  <p className="errorMsg"> {formik.errors.email} </p>
                )}
              </div>
              <a href="#!" onClick={Click}>
                Quay lại
              </a>
              <hr class="my-4"></hr>
              <button class="gg btn btn-block btn-primary" type="submit">
                TIẾP TỤC
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Forgot_Pass;
