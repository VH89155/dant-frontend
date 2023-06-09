import { useEffect, useState } from "react";
import "./ticket_price.css"
import axios from "axios";
const Ticket = () => {
   const [giaVe, setGiaVe] = useState({})

   useEffect(()=>{
      const fechData = async()=>{
        await axios.get("https://project-datn.herokuapp.com/api/new/646b2473bacdd834f63a1882").then((res)=>{
          setGiaVe(res.data.news)
        })
      }
      fechData()
   },[giaVe])
    return ( <>
    <div className="container">
      <div className="page-title">
        <div className="title">GIÁ VÉ </div>
        <img src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/icon-gv.png"></img>
        <div className="down-title-page">
         <p>GIÁ VÉ XEM PHIM</p>
         <p>(Áp dụng từ ngày 10/04/2023)</p>
        </div>
       </div>
   <div className="title-page-2">1. Giá vé xem phim 2D</div>
    <img src="../images/bang-gia-ve-2D1.png"></img>
    <div className="title-page-2">2. Giá vé xem phim 3D</div>
    <img src="../images/bang-gia-ve-3D.png"></img>
    
    {giaVe?.data && ( <>
     <div dangerouslySetInnerHTML={{ __html : giaVe.data }}></div>
      </>) }
     </div>
    
    </> );
}
 
export default Ticket;