import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./bannerHome.css";
import { Carousel } from "antd";

const BannerHome = () => {
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];
  return (
    <>
      <div className="banner-back layout">
      <img className="img-qc1" src="https://www.cgv.vn/media/wysiwyg/2023/032023/120x600_1.jpg"></img>
    <img className="img-qc2" src="https://www.cgv.vn/media/wysiwyg/2023/032023/120x600_2.jpg"></img>
        <div className="container">
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          
          <img class="bd-placeholder-img bd-placeholder-img-lg img-back d-block w-100"   src="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"></img>
        
        </div>
        <div class="carousel-item active">
          
          <img class="bd-placeholder-img bd-placeholder-img-lg img-back d-block w-100"   src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_203.jpg"></img>
        
        </div>
        <div class="carousel-item active">
          
          <img class="bd-placeholder-img bd-placeholder-img-lg img-back d-block w-100"   src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_-min_5.jpg"></img>
        
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
        </div>
      </div>
    </>
  );
};

export default BannerHome;
