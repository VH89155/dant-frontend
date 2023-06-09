import "./index.css";
import { Link } from 'react-router-dom';
const App = (props) => {
    const {data} = props;
    console.log("data", data);
  return (
    <div className="container ">
      <div className="page-title">
       <div class="title"> PHIM ĐANG CHIẾU</div> 
       <img  src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/img48.png"></img>
      </div>
     

    <div className="date-showtime">
   {data?.map((item,index)=>{
          // let open= true;
          // const Click = (e)=>{
          //   console.log(open)
          //     open = !open
          // }
        

          return (
              <>
                    <div className="tab-date" key={index}>
                    <a  ><div className="date-show" >Ngày {item.date}</div></a>
                    {  item?.array?.map((item,index)=>{
                       const time = new Date( item.moive.premiere_date);
                        if(item?.arrayTimeDate?.length > 0){
                          return (
                            <div className="item-moive" key={index}>
                              <Link to={`/details/${item.moive._id}`}>
                            <img
                              id="myimage"
                              src={item.moive.images[0]}
                              alt=""
                            ></img>
                            </Link>
                            <div className="detail-group-shop">
                              <div class="name">{item.moive.name} <div className="span">{item.moive.display_technology
}</div> </div>
                              <div class="label">
                                Đạo diễn: <span> {item.moive.director}</span>
                              </div>
                              <div class="label">
                                Diễn viên:
                                <span>
                                  
                                  {item.moive.performer.map((item,index,array)=>{
                                     if(index ===array.length -1 ){
                                       return `${item}.`
                                     }
                                     else if(index !==array.length -1){
                                      return `${item}, `
                                     }
                                  })}
                                </span>
                              </div>
                              <div class="label">
                                Thể loại: <span>

                                {item.moive.category.map((item,index,array)=>{
                                     if(index ===array.length -1 ){
                                       return `${item}.`
                                     }
                                     else if(index !==array.length -1){
                                      return `${item}, `
                                     }
                                  })}
                                </span>
                              </div>
                              <div class="label">
                                Khởi chiếu: <span>{time.getDate()}-{time.getMonth()+1}-{time.getFullYear()} </span>
                              </div>
                              <div class="label">
                                Thời lượng: <span> {item.moive.time} phút</span>
                              </div>
                              <div class="label">
                                Ngôn ngữ: <span> Tiếng Việt - Phụ đề Tiếng Anh</span>
                              </div>
                              <div class="label">
                                Rated: <span> C{item.moive.age}</span>
                              </div>
                            </div>
                            <div className="times">
                              {/* <button type="button" class="btn btn-outline-danger">
                                9:15
                              </button> */}
                              {item?.arrayTimeDate.map((item,index)=>{
                             const time = new Date(item.time)
                            return (
                              <Link key={index} to ={`/book-ticket/${item._id}`}>
                            <button type="button" key={index} className="btn btn-outline-danger" style={{marginRight: 20}}>
                            { time.getHours() >9 ? time.getHours() :`0${ time.getHours()}`} :  { time.getMinutes() >9 ? time.getMinutes() : `${time.getMinutes()}0`}
                           </button> </Link>
                        )
                       })}
                              
                              
                            </div>
                          </div>
                            )
                        }
                     
                    })
                      
                    }
                    </div>
              </>
          )


   })}
   </div>
   </div>
  );
};

export default App;
<></>;
