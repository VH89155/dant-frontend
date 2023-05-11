import { useEffect, useState } from "react";
import "./index.css";
import EditMoive from "./edit-moive";

const MoiveShow = (props) => {
  const { moiveItem,edit,isEdit , load, setLoad } = props;
 
  const SetEdit = ()=>{
    isEdit(!edit)
  }
  console.log(edit)


  console.log(moiveItem);
  return (
    <>
    {
      edit ? (<>
          <div className="moive-show">
        <div className="left-moive-show">
        <img src={moiveItem?.images[0]}></img>
        <div className="group-btn">
            <button className="btn btn-danger" onClick={SetEdit}>Chỉnh sửa</button>
            <button className="btn btn-success" >Xem lịch chiếu</button>

        </div>
        </div>
       
        <div className="moive-show__content">
          <h3 className="name"> {moiveItem.name}</h3>

          <div className="label">
            Đạo diễn: <span>{moiveItem.director}</span>{" "}
          </div>
          <div className="label">
            Diễn viên:{" "}
            <span>
              {" "}
              {moiveItem?.performer?.map((item, index, p) => {
                if (index == p.length - 1) {
                  return `${item}.`;
                } else {
                  return `${item}, `;
                }
              })}
            </span>{" "}
          </div>
          <div className="label">
            Thể loại:{" "}
            <span>
              {moiveItem?.category?.map((item, index, moiveItems) => {
                console.log(index, moiveItems.length);
                if (index == moiveItems.length - 1) {
                  return `${item}.`;
                } else {
                  return `${item}, `;
                }
              })}
            </span>{" "}
          </div>
          <div className="label">
            Khởi chiếu: <span>  {moiveItem.premiere_date}</span>
        
          </div>
          <div className="label">
            Thời lượng: <span> {moiveItem.time} phút</span>{" "}
          </div>
          <div className="label">
            Ngôn ngữ: <span> Tiếng Việt - Phụ đề Tiếng Anh</span>{" "}
          </div>
          <div className="label">
            Rated: <span> C{moiveItem.age}</span>{" "}
          </div>

          <div className="label">Mô tả: <span>{moiveItem.description}</span> </div>
          <div className="label">Trailer: </div>
          <iframe id="video-moive" width="450" height="200" src="https://res.cloudinary.com/duytmd7ue/video/upload/v1682960052/WW2_-_OverSimplified_Part_1_wuxtit.mp4" alt={moiveItem?.trailer}>
            </iframe>
        </div>
      </div>
      </>) 
      
      
      
      :(<>
      <EditMoive moive ={moiveItem} load={load} setLoad={setLoad}></EditMoive>
      </>)
    }
    
    </>
  );
};

export default MoiveShow;
