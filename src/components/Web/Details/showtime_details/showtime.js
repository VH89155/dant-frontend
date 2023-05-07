import "./showtime.css";
import { Link } from 'react-router-dom';

const ShowTimeDetail = (props) => {
  const { times } = props;
  console.log(times);
  const date = new Date();
  console.log("date", date.getDay());
  let array = [];

  /// 1- CN, 0 - thu 7, 6 - thu 6,......
  for (let i = date.getDay(); i <= date.getDay() + 6; i++) {
    for (let j = 0; j < times.length; j++) {
      const b = new Date(times[j].time);

      if (i > 6) {
        if (b.getDay() == i - 7)
          array.push({ day: b.getDay() + 1, times: times[j] });
      } else {
        if (b.getDay() == i)
          array.push({ day: b.getDay() + 1, times: times[j] });
      }
    }
  }
  console.log("array", array);

  return (
    <>
      <div className="showtimes">
        <div className="label">
          <img src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/icon06.png"></img>
          LỊCH CHIẾU
        </div>

        {/* 111111111 */}

        {array?.map((item, index) => {
          const time = new Date(item.times.time);
          const a= item.times.array   
          return (
            <>
              <div className="date_show">
                <div className="day">
                  {time.getDay() + 1 > 8 && `Thứ ${time.getDay() + 3 - 7}`}
                  {time.getDay() + 1 == 8 && "Chủ nhật"}
                  {time.getDay() + 1 <= 7 && `Thứ ${time.getDay() + 1}`} :{" "}
                  {time.getDate()}-{time.getMonth() + 1}-{time.getFullYear()}{" "}
                </div>

                <div className="times">
                  {a?.map((item,index)=>{

                   const time = new Date(item.time)
                    return (
                    <Link key={index} to ={`/book-ticket/${item._id}`}>
                  <button
                    type="button"
                    key={index}
                    className="btn btn-outline-danger"
                  >
                    {time.getHours()} : {time.getMinutes()}
                  </button></Link>)
                  }) }
                
                </div>
              </div>
            </>
          );
        })}
      </div>

      
      
    </>
  );
};

export default ShowTimeDetail;
