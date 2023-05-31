import { useEffect, useState } from "react";
import "./detail-container.css";
import { Link } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import ShowTimeDetail from "./showtime_details/showtime";
import SliderMoive from "./slider-movie/slider-moive";
import { useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from "axios";
const DetailContainer = () => {
const onChange = (key) => {
  console.log(key);
};

// ];


// const history = useHistory();



const {moiveId} = useParams();
const navigate = useNavigate()
console.log(moiveId);
const [moive,setMoive] =useState({})
const [times,setTime] =useState({})
const [votes,setVotes] = useState([])
const [openTrailer,setOpenTrailer]= useState(false)

useEffect(()=>{
  const fetchData = async () =>{
    try{
      await axios.get(`/api/moive/${moiveId}`)
      .then((response) =>{
        console.log(response.data);
        setMoive(response.data.moive);
        setTime(response.data.arayTimeDate);
        setVotes(response.data.votes)
      })
      .catch((error) =>console.log(error))     
    }
    catch(err){
      // navigate("/")
    }
    
  }
  fetchData();
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  scrollToTop()

  // history.listen(scrollToTop);

  // return () => {
  //   history.unlisten(scrollToTop);
  // };

 
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
             <Link to ={`/ticket-booking?moiveID=${moiveId}`} >  <button type="button" class="btn btn-danger" >
                  Đặt vé
                </button>
                </Link> 
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
            
         <div className="comment_moive" >
                  <div className="title-comment">Đánh giá từ khách hàng xem phim</div>  
                  {
              votes?.map((item,index)=>{
                const time = new Date(item.createdAt)


                return(
                  <>
                  <div className="group-user" key={index}>
                <img src={item?.user.avatar}></img>
                <div className="text" >
                  <div style={{display:"flex"}}>
                  <p>{item.user.username}   </p>
                   <Rating style={{color:"yellow"}} value={item.star} readOnly />
                  
                   <span className="span-text">Ngày: {time.getDate()}-{time.getMonth()+1}-{time.getFullYear()} </span>
                  </div>
                
                <p style={{color:"#af8f8f", borderBottom:"1px soild red"}}>{item.description}</p>
                </div>
                  </div>
                  </>
                )
              })
            }
                 
         </div>
            <SliderMoive moive = {moive}></SliderMoive>

         
      </div>
    </>
  );
};

export default DetailContainer;
