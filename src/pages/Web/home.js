import BannerHome from "../../components/Web/home/banner/bannerHome";
import Container from "../../components/Web/home/container/container";
import News_home from "../../components/Web/home/news/news";
import axios from "axios";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";


const Home = () => {
  const [banner,setBanner] = useState({})
  const [load,setLoad]=useState(false)
  useEffect(()=>{
          const fetchData = async ()=>{
              await axios.get('https://project-datn.herokuapp.com/api/banner').then(res=>{
                  
                      console.log(res.data.banner[0])
                      setBanner(res.data.banner[0])
                 
              })
          }
          fetchData()
  },[load])
  return (
    <>
    <BannerHome  banner={banner}/>
      <div class="container">
        
       <Container ></Container>
       <News_home></News_home>
       <Link to={"/news"}>
       <h4 style={{textAlign:"right", color:"#130f0f", marginBottom:"100px", fontSize:"18px"}}> {'<< Xem thêm >>'}</h4>
       </Link>
      </div>
    </>
  );
};

export default Home;
