import { useState,useEffect } from "react";
import axios from "axios";

const HomeAdmin = () => {
    const [dataToday,setDataToday] = useState({})

    useEffect(()=>{
        const fecth = async()=>{
            await axios.get("/api/statistical").then((res)=>{
              setDataToday(res.data)
            })
          
        }
        fecth()
    
    },[])
    return ( <>
    <h3 className="" style={{textAlign:"center" ,color:"#d11414"}}>THU NHẬP HÔM NAY</h3>
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
    </> );
}
 
export default HomeAdmin;