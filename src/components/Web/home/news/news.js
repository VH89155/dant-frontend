import "./index.css"
import { Link } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
const News_home = () => {
   
    const [data, setData] = useState([]);

    useEffect(() => {
        const fechData = async () => {
          await axios.get("https://project-datn.herokuapp.com/api/new").then((res) => {
            console.log(res.data);
            setData(res.data.new);
          });
        };
        fechData();
      },[]);
      data.sort((a,b)=>{
        const timea =new Date(a.time)
        const timeb =new Date(b.time)
        if(timea.getTime()>timeb.getTime()) return -1;
        if(timea.getTime()<timeb.getTime()) return 1;
      })
     const data1=  data.slice(0,2)
    return ( 
    
    <>
        <h3 style={{paddingLeft: 20, borderBottom:"1px solid #ccc", marginTop:30}}> <em>Tin tức mới nhất</em></h3>
        <div className="row">
        {
          data1?.map((item,index)=>{
            const time =new Date(item.time)
            return (

              <div className="col-lg-6 col-" key={index}>
              <div className="item-news">
                <img src={item.image}></img>
                <div className="tx-moive">
                  <div className="tx-moive-title">
                  {item.name}
                  </div>
                  <div className="tx-moive-time">
                    Thời gian: {time.getDate()}-{time.getMonth()+1}-{time.getFullYear()}
                  </div>
               <Link to={`/news/${item._id}`}>  <button type="button" class="btn btn-outline-danger">Xem chi tiết</button></Link> 
                </div>
              </div>
            </div>
    
            )
          })
        }
       
     
        
        
      </div>
        
    </> );
}
 
export default News_home;