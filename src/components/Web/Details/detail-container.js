import { useState } from "react";
import "./detail-container.css";
import { Modal,Tabs } from "antd";
import ShowTimeDetail from "./showtime_details/showtime";
import SliderMoive from "./slider-movie/slider-moive";

const DetailContainer = () => {
  // function imageZoom(imgID, resultID) {
  //     var img, lens, result, cx, cy;
  //     img = document.getElementById(imgID);
  //     result = document.getElementById(resultID);
  //     /*create lens:*/
  //     lens = document.createElement("DIV");
  //     lens.setAttribute("class", "img-zoom-lens");
  //     /*insert lens:*/
  //     img.parentElement.insertBefore(lens, img);
  //     /*calculate the ratio between result DIV and lens:*/
  //     cx = result.offsetWidth / lens.offsetWidth;
  //     cy = result.offsetHeight / lens.offsetHeight;
  //     /*set background properties for the result DIV:*/
  //     result.style.backgroundImage = "url('" + img.src + "')";
  //     result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  //     /*execute a function when someone moves the cursor over the image, or the lens:*/
  //     lens.addEventListener("mousemove", moveLens);
  //     img.addEventListener("mousemove", moveLens);
  //     /*and also for touch screens:*/
  //     lens.addEventListener("touchmove", moveLens);
  //     img.addEventListener("touchmove", moveLens);
  //     function moveLens(e) {
  //       var pos, x, y;
  //       /*prevent any other actions that may occur when moving over the image:*/
  //       e.preventDefault();
  //       /*get the cursor's x and y positions:*/
  //       pos = getCursorPos(e);
  //       /*calculate the position of the lens:*/
  //       x = pos.x - (lens.offsetWidth / 2);
  //       y = pos.y - (lens.offsetHeight / 2);
  //       /*prevent the lens from being positioned outside the image:*/
  //       if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
  //       if (x < 0) {x = 0;}
  //       if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
  //       if (y < 0) {y = 0;}
  //       /*set the position of the lens:*/
  //       lens.style.left = x + "px";
  //       lens.style.top = y + "px";
  //       /*display what the lens "sees":*/
  //       result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  //     }
  //     function getCursorPos(e) {
  //       var a, x = 0, y = 0;
  //       e = e || window.event;
  //       /*get the x and y positions of the image:*/
  //       a = img.getBoundingClientRect();
  //       /*calculate the cursor's x and y coordinates, relative to the image:*/
  //       x = e.pageX - a.left;
  //       y = e.pageY - a.top;
  //       /*consider any page scrolling:*/
  //       x = x - window.pageXOffset;
  //       y = y - window.pageYOffset;
  //       return {x : x, y : y};
  //     }

  //   }
  //   imageZoom("myimage", "myresult");

//   const [open, setIsOpen] = useState(false);
//   const showModal = () => {
//     setIsOpen(true);
//   };

//   const handleOk = () => {
//     setIsOpen(false);
//   };

//   const handleCancel = () => {
//     setIsOpen(false);
//   };
var openDescription = "flex"; 
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: `Tab 1`,
    children: `Content of Tab Pane 1`,
  },
  {
    key: '2',
    label: `Tab 2`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: '3',
    label: `Tab 3`,
    children: `Content of Tab Pane 3`,
  },
];
const Open = ()=>{
    document.getElementById("video-moive").style.display = "flex";
    document.getElementsByClassName("description").style.display = "none";
    openDescription ="none"
}  

return (
    <>
      <div className="container">
        <div className="product-detail">
          <div className="page-title">Nội Dung Phim</div>
          <div className="detail-group">
            <div className="detail-group--img">
              <img
                id="myimage"
                src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
                alt=""
              ></img>
              <div id="myresult" class="img-zoom-result"></div>
              <div class="group_button">
                <button
                  type="button"
                  class="btn btn-success"
                 onClick={Open}
                >
                  Trailer
                </button>
               
               

                <button type="button" class="btn btn-danger">
                  Đặt vé
                </button>
              </div>
              <iframe id="video-moive" width="650" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY">
                </iframe>
            </div>
            <div className="detail-group-shop">
              <div class="name-movie">TAY ĐẤM HUYỀN THOẠI </div>
              <div class="label">
                Đạo diễn: <span> Tạ Nguyên Hiệp</span>{" "}
              </div>
              <div class="label">
                Diễn viên:{" "}
                <span>
                  {" "}
                  Lê Khánh, Hứa Vĩ Văn, Hoàng Oanh, Quang Tuấn, Võ Tấn Phát,
                  Nguyên Thảo, Ngọc Phước, Ngọc Hoa, Lạc Hoàng Long
                </span>{" "}
              </div>
              <div class="label">
                Thể loại: <span> Hài</span>{" "}
              </div>
              <div class="label">
                Khởi chiếu: <span> 31/03/2023</span>{" "}
              </div>
              <div class="label">
                Thời lượng: <span> 104 phút</span>{" "}
              </div>
              <div class="label">
                Ngôn ngữ: <span> Tiếng Việt - Phụ đề Tiếng Anh</span>{" "}
              </div>
              <div class="label">
                Rated: <span> C13</span>{" "}
              </div>
            </div>
          </div>
          <div className="description" 
        >
            Dựa trên thảm họa rơi máy bay có thật năm 1981. Vào ngày 24 tháng 8
            năm 1981, đôi vợ chồng mới cưới Larisa và Vladimir Savitsky lên
            chuyến bay Komsomolsk-on-Amur - Blagoveshchensk. 30 phút sau khi hạ
            cánh, máy bay dân sự AN-24 va chạm với một máy bay khác và bị vỡ
            thành mảnh vụn ở độ cao hơn 5 km so với mặt đất. Không ai được dự
            đoán sống sót... nhưng một phép màu đã xảy ra. Larisa Savitskaya
            tỉnh dậy giữa đống đổ nát của chiếc máy bay tại một khu rừng rậm
            rạp. Bây giờ, cô phải tạo ra một phép màu thật sự, điều mà chỉ một
            người có ý chí mạnh mẽ mới có thể làm được… sống sót!
          </div>
        </div>
      
            <ShowTimeDetail>

            </ShowTimeDetail>
        
            <SliderMoive></SliderMoive>

        
      </div>
    </>
  );
};

export default DetailContainer;
