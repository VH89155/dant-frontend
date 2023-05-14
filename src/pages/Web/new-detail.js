import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const News_detail = () => {

    const {id} = useParams()
    const [data,setData] = useState({})

    useEffect(()=>{
       const fechData = async()=>{
        axios.get(`/api/new/${id}`).then((res)=>{
            console.log(res.data);
            setData(res.data.news)
           
        })

       }
       fechData()
    },[id])
    return ( <>

<div className="container">
      <div className="page-title">
        <div className="title">TIN TỨC </div>
        <img src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/img40.png"></img>
      </div>
      <h3 style={{margin:"20px 0 20px 0" , borderBottom:"1px solid #ccc"}}>{data.name}</h3>
      {data?.data && ( <>
     <div dangerouslySetInnerHTML={{ __html : data.data }}></div>
      </>) }

  

</div>
    </> );
}
 
export default News_detail;