import { Link } from "react-router-dom";
import "./news-home.css"

const NewsHome = (props) => {
  const {data} = props
    return (  <div className="container">
      <div className="page-title">
        <div className="title">TIN TỨC </div>
        <img src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/img40.png"></img>
      </div>

      <div className="row" >
        {
          data?.map((item,index)=>{
            const time =new Date(item.time)
            return (

              <div className="col-lg-6 col-" key={index}>
              <div className="item-news">
                <img src={item.image}></img>
                <div className="tx-moive">
                  <div className="tx-moive-title">
                  {item.name}
                  </div>
                  <div className="tx-moive-time">
                    Thời gian: {time.getDate()}-{time.getMonth()+1}-{time.getFullYear()}
                  </div>
               <Link to={`/news/${item._id}`}>  <button type="button" class="btn btn-outline-danger">Xem chi tiết</button></Link> 
                </div>
              </div>
            </div>
    
            )
          })
        }
       
     
        
        
      </div>
    </div>);
}
 
export default NewsHome;