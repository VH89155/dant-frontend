import { useEffect,useState } from "react";
import Sidebar from "../../../components/Web/custom_account/sidebar";
import { useSelector } from "react-redux";
import { Spin } from 'antd';
import EditAccContent from "../../../components/Web/custom_account/edti-acc";


const Account_edit = () => {
    const [load,setLoad] = useState(false);
    const auth = useSelector((state)=>state.auth?.login)
    const namePage = "editAccount";
    useEffect(()=>{
       
    },[load])
   
    return ( <>
        
              
             <div className="container custom_account">
             <Spin tip="Loading..." spinning= {auth?.isFetching}>
            <Sidebar namePage={namePage}  setLoad={setLoad} auth ={auth}>


            </Sidebar>
            <EditAccContent setLoad={setLoad} load={load} auth ={auth}>

            </EditAccContent>
            </Spin>
        </div>
          
        
      
        
    </>  );
}
 
export default Account_edit;