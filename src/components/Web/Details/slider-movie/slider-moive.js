import "./slider-moive.css";
import { Carousel } from "@trendyol-js/react-carousel";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick"

const SliderMoive = (props) => {
   const {moive} = props
   const allMoive = useSelector(state=>state?.moives?.moives?.allMoives)
   console.log(allMoive,moive)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
      };
  return (
    <>
      <div className="slider">
        <p style={{color:"#ccc", fontSize:"18px", fontWeight:"500"}}> Phim đang chiếu </p>
        
        <Slider {...settings} >
            {allMoive?.map((item,index)=>{
                if(item._id !== moive._id)
                return (
                  <div className="slider-img" key={index}>
                    <Link to={`/details/${item._id}`} > <img
                  src={item?.images[0]}
                  alt=""
                ></img></Link> </div>
                )
            })}
           
         
       
        </Slider>
      </div>
     
        
    </>
  );
};

export default SliderMoive;
