import { useEffect,useState } from "react";
import Main_default from "../../../components/Web/custom_account/main-default";
import Sidebar from "../../../components/Web/custom_account/sidebar";
import { useSelector } from "react-redux";
import { Spin } from 'antd';


const DefaultCustom_Acc = () => {
    const [load,setLoad] = useState(false);
    const auth = useSelector((state)=>state.auth?.login)
    const namePage ="default"
    useEffect(()=>{
       
    },[load])
   
    return ( <>
        
              
             <div className="container custom_account">
             <Spin tip="Loading..." spinning= {auth?.isFetching}>
            <Sidebar namePage={namePage}  setLoad={setLoad} auth ={auth}>


            </Sidebar>
            <Main_default setLoad={setLoad} load={load} auth ={auth}>

            </Main_default>
            </Spin>
        </div>
          
        
      
        
    </>  );
}
 
export default DefaultCustom_Acc;