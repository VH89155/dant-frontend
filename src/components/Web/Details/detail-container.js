import { useEffect, useState } from "react";
import "./detail-container.css";
import ShowTimeDetail from "./showtime_details/showtime";
import SliderMoive from "./slider-movie/slider-moive";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const DetailContainer = () => {
const onChange = (key) => {
  console.log(key);
};

// ];

const {moiveId} = useParams();
const navigate = useNavigate()
console.log(moiveId);
const [moive,setMoive] =useState({})
const [times,setTime] =useState({})
const [openTrailer,setOpenTrailer]= useState(false)

useEffect(()=>{
  const fetchData = async () =>{
    try{
      await axios.get(`/api/moive/${moiveId}`)
      .then((response) =>{
        console.log(response.data);
        setMoive(response.data.moive);
        setTime(response.data.arayTimeDate);
      })
      .catch((error) =>console.log(error))     
    }
    catch(err){
      // navigate("/")
    }
    
  }
  fetchData();

 
},[moiveId,navigate])

const time =Date.parse(moive.premiere_date)
const date = new Date(time);

return (
    <>
      <div className="container">
        <div className="product-detail">
          <div className="page-title">Nội Dung Phim</div>
          <div className="detail-group">
            <div className="detail-group--img">
              <img
                id="myimage"
                src={moive.images}
                alt=""
              ></img>
              <div id="myresult" className="img-zoom-result"></div>
              <div className="group_button">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={()=>setOpenTrailer(!openTrailer)}
                >
                  Trailer
                </button>
                <button type="button" class="btn btn-danger" >
                  Đặt vé
                </button>
              </div>
            {openTrailer && ( 
            <iframe id="video-moive" width="650" height="345" src="https://res.cloudinary.com/duytmd7ue/video/upload/v1682960052/WW2_-_OverSimplified_Part_1_wuxtit.mp4" alt={moive?.trailer}>
                </iframe>)}
            </div>
            <div className="detail-group-shop">
              <div className="name-movie">{moive?.name} </div>
              <div className="label">
                Đạo diễn: <span>{moive.director}</span>{" "}
              </div>
              <div className="label">
                Diễn viên:{" "}
                <span>
                  {" "}
                 {moive?.performer?.map((item,index,p)=>{
                  
                  if(index  == p.length -1){
                    return `${item}.`
                  }
                  else{
                    return `${item}, `}
                  }
                    )}
                </span>{" "}
              </div>
              <div className="label">
                Thể loại: <span>{moive?.category?.map((item,index,moives)=>{
                  console.log(index, moives.length)
                  if(index  == moives.length -1){
                    return `${item}.`
                  }
                  else{
                    return `${item}, `}
                  }
                    )}</span>{" "}
              </div>
              <div className="label">
                Khởi chiếu: <span> {}
                </span>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}
              </div>
              <div className="label">
                Thời lượng: <span> {moive.time}</span>{" "}
              </div>
              <div className="label">
                Ngôn ngữ: <span> Tiếng Việt - Phụ đề Tiếng Anh</span>{" "}
              </div>
              <div className="label">
                Rated: <span> C{moive.age}</span>{" "}
              </div>
            </div>
          </div>
          <div className="description" 
        >
            {moive.description}
          </div>
        </div>
      
            <ShowTimeDetail times ={times}>

            </ShowTimeDetail>
        
            <SliderMoive></SliderMoive>

        
      </div>
    </>
  );
};

export default DetailContainer;
