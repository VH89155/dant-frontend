import "./index.css"
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { message,Button,Modal } from "antd";
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import { getProfile } from "../../../redux/apiRequest";
import { useEffect, useState } from "react";
import FormEditPass from"./formEditPass";
const EditAccContent = (props) => {
  
let {auth,setLoad,load} =props;
const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      fullName:  auth?.currentUser?.info.fullName ?? "" ,  
      address :  auth?.currentUser?.info.address ?? "",
     phoneNumber: auth?.currentUser?.info.phoneNumber ?? "",
     _id: auth?.currentUser?.info._id,
      
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
    phoneNumber: Yup.number().required("Required").min(10),
    
    }),
    onSubmit: async (values) => {
      // window.alert("Form submitted");
      console.log(values);
      await axios.post("http://localhost:8080/api/auth/edit-profile", values)
      .then(res=>{
        console.log(res.data);
        message.success("Thành công")
        setLoad(!load)
      }).catch((err) => console.log(err));

    
    }})
    useEffect(() => {
        getProfile(dispatch, auth?.token);
      }, [load]);
    


      const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = async() => {
         
          setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    
    return ( <>
          <div className="main-default_acc">
        <div className="my_account">
          <div className="page-title-df-acc">
            <h3>THÔNG TIN CHUNG</h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
      <div class="form-group" 
      style={{display: "flex", width:"100%", marginTop:40}}>

        <div style={{width:"40%", marginRight:"20px"}}>
        <label style={{marginBottom:10}} class="form-control-label">Họ và tên</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
         
          class="form-control"
        />

        {formik.errors.fullName && (
          <p className="errorMsg"> {formik.errors.fullName} </p>
        )}   
       </div>



       <div style={{width:"40%", marginRight:"20px"}}>
        <label style={{marginBottom:10}} class="form-control-label">Số điện thoại</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
         
          class="form-control"
        />

        {formik.errors.phoneNumber && (
          <p className="errorMsg"> {formik.errors.phoneNumber} </p>
        )}   
       </div>


       <div style={{width:"40%", marginRight:"20px"}}>
        <label style={{marginBottom:10}} class="form-control-label">Địa chỉ</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
         
          class="form-control"
        />

        {formik.errors.address && (
          <p className="errorMsg"> {formik.errors.address} </p>
        )}   
       </div>
         
        </div>
        <label style={{marginBottom:10, marginTop:30}} class="form-control-label">Địa chỉ Email</label>
        <p>{auth?.currentUser?.info?.email}</p>
        <label style={{marginBottom:10, marginTop:20}} class="form-control-label">Tên tài khoản</label>
        <p>{auth?.currentUser?.info?.username}</p>
       
       
        <button style={{marginTop:20, textAlign:"right"}} type="submit" class="btn btn-outline-primary">
           Lưu lại
          </button>
       
      
     </form>


          </div>
          <Button style={{marginTop:50}} type="default" onClick={()=>{
            setIsModalOpen(true);
          }}>Thay đổi mật khẩu</Button>
        
          </div>
          <Modal  width={1000} title="Thay đổi mật khẩu" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <FormEditPass auth={auth} load={load} setLoad={setLoad} ></FormEditPass>
          </Modal>
    
    </> );
}
 
export default EditAccContent;