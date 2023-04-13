import "./slider-moive.css";
import { Carousel } from "@trendyol-js/react-carousel";
import Slider from "react-slick"

const SliderMoive = () => {
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
        <p> Phim đang chiếu </p>
        
        <Slider {...settings} >
            <div className="slider-img"> <img
            src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
            alt=""
          ></img></div>
         
         <div className="slider-img"> <img
            src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
            alt=""
          ></img></div>
           <div className="slider-img"> <img
            src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
            alt=""
          ></img></div>
           <div className="slider-img"> <img
            src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
            alt=""
          ></img></div>
           <div className="slider-img"> <img
            src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
            alt=""
          ></img></div>

<div className="slider-img"> <img
            src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
            alt=""
          ></img></div>
        </Slider>
      </div>
     
        
    </>
  );
};

export default SliderMoive;
