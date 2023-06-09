import { useState,useEffect } from "react";
import axios from "axios";
import { InputNumber } from 'antd';
import LineChart from "../../../components/Admin/Chart/LineChart";


const HomeAdmin = () => {
    const [dataToday,setDataToday] = useState({})
    const [fullMonth,setfullMonth] = useState([])
    const [month,setMonth] =useState(6)
    useEffect(()=>{
        const fecth = async()=>{
            await axios.get("/api/statistical").then((res)=>{
              setDataToday(res.data)
            })
            await axios.get(`/api/statistical//total-month/${month}`).then((res)=>{
                setfullMonth(res.data)
              })
          
        }
        fecth()
    
    },[month])
    const onChange = (value) => {
        console.log('changed', value);
        setMonth(value)
      };
    const DataMonth ={
        labels:fullMonth.map(item=> item.day),
        datasets: [
            
                {
                    data: fullMonth.map(item=>item.total.TotalVe),
                    label:"Tổng tiền vé thu được",
                    borderColor: "#3cba9f",
                    fill:false,

                },
                {
                    data: fullMonth.map(item=>item.total.Total),
                    label:"Tổng tiền vé + combo thu được",
                    borderColor: "#8e5ea2",
                    fill:false,

                }
            
        ]
    }
    return ( <>
    <h3 className="" style={{textAlign:"center" ,color:"#d11414"}}>DOANH THU HÔM NAY</h3>
    <div style={{display:"flex", justifyContent:"space-between" ,padding:"50px 200px"}}>

        <div style={{width:"30%",border:"1px solid #cccccc",borderRadius:"10px", padding:"20px", textAlign:"center",boxShadow:"0 3px 9px rgba(0,0,0,.5)", minHeight:"100px"}}> 
        <i className="fa-solid fa-money-bill fa-beat fa-2xl" style={{color:"#f6ff75"}}></i>
        <h4 style={{color:"#222",fontSize:"20px" , marginTop:"10px" }}>Tổng tiền</h4>
        <h4 style={{color:"#222",fontSize:"20px" , marginTop:"10px"}} >{dataToday.Total/1000}.000 VND</h4>
        </div>
        <div style={{width:"30%",border:"1px solid #cccccc",borderRadius:"10px", padding:"20px", textAlign:"center",boxShadow:"0 3px 9px rgba(0,0,0,.5)", minHeight:"100px"}}> 
        <i className="fa-solid fa-ticket fa-beat fa-2xl" style={{color: "#d5204d"}}></i>
       
        <h4 style={{color:"#222",fontSize:"20px" , marginTop:"10px" }}>Tổng tiền vé</h4>
        <h4 style={{color:"#222",fontSize:"20px" , marginTop:"10px"}} >{dataToday.TotalVe/1000}.000 VND</h4>
       
       
       
        </div>
        <div style={{width:"30%",border:"1px solid #cccccc",borderRadius:"10px", padding:"20px", textAlign:"center",boxShadow:"0 3px 9px rgba(0,0,0,.5)", minHeight:"100px"}}> 
      
        <i className="fa-solid fa-couch fa-beat fa-2xl" style={{color: "#20de12"}}></i>
        <h4 style={{color:"#222",fontSize:"20px" , marginTop:"10px" }}>Tổng ghế</h4>
        <h4 style={{color:"#222",fontSize:"20px" , marginTop:"10px"}} >{dataToday.tongGhe}</h4>
        </div>

    </div>
    <h3 className="" style={{textAlign:"center" ,color:"#d11414"}}>DOANH THU THÁNG {month} </h3>
    <InputNumber min={1} max={12} defaultValue={month} onChange={onChange} />
    <LineChart chartData={DataMonth}></LineChart>
    </> );
}
 
export default HomeAdmin;