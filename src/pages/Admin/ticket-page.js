import axios from "axios";
import { useEffect, useState } from "react";
import {  Form, Select, Spin } from "antd";
import Table_ticket from "../../components/Admin/ticket-page/table-ticket";

const Ticket_page = () => {
    const [load, setLoad] = useState(true)
    const [spin, setSpin] = useState(false)
    const [ value, setValue]= useState("0")
    const [bills,setBills] = useState([])
    const option =[{
        value:"0",
        label:" Vé chưa xác nhận "
    },
    {
        value:"1",
        label:" Vé đã xác nhận!"
    },
    {
        value:"2",
        label:" Vé yêu cầu hủy "
    },{
        value:"3",
        label:"Vé đã hủy "
    },{
        value:"4",
        label:"Vé đã hoàn thành"
    }

]
    const onChange =(value)=>{
        setValue(value)
    }
    useEffect(()=>{
        const fetchData = async()=>{
            await axios.get(`https://project-datn.herokuapp.com/api/ticket/ticket-all/${value}`).then((res)=>{
               setBills(res.data.bills) 
               console.log("bills asd", res.data.bills)
            })
        }
        fetchData()
    },[load,value])
    
    return ( <>
   
     <Form.Item label="Chọn: ">
          <Select
            defaultValue={{
              value: "0" ,
              label: "Vé chưa xác nhận !"
            }}
            // onChange={onChangeAge}
            options={option}
            onChange={onChange}
          />
         
        </Form.Item>

        {value === "0" && (<>
        <h3 style={{color:"#222", textAlign:"center", marginBottom:50}}>VÉ CHỜ XÁC NHẬN</h3>
        
        </> )

        }
        {value === "3" && (<>
        <h3 style={{color:"#222", textAlign:"center", marginBottom:50}}>VÉ HỦY</h3>
        
        </> )
        

        }
        {value === "4" && (<>
        <h3 style={{color:"#222", textAlign:"center", marginBottom:50}}>VÉ HOÀN THÀNH</h3>
        
        </> )
        

        }
        {value === "1" && (<>
        <h3 style={{color:"#222", textAlign:"center", marginBottom:50}}>VÉ ĐÃ XÁC NHẬN</h3>
        
        </> )

        }
        {value === "2" && (<>
        <h3 style={{color:"#222", textAlign:"center", marginBottom:50}}>VÉ YÊU CẦU HỦY</h3>
        
        </> )

        }
        <Spin spinning={spin}>
        <Table_ticket spin={spin} setSpin={setSpin} bills={bills} value={value} load={load} setLoad={setLoad}></Table_ticket>
        </Spin>
    
    </> );
}
 
export default Ticket_page;