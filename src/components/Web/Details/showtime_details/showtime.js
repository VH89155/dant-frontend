import "./showtime.css";

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
        <div className="date_show">
          <div className="day">
          {date.getDay()+1 >8 && `Thứ ${date.getDay()+3-7}`}{date.getDay()+1 ==8 && "Chủ nhật"}{date.getDay()+1<=7 && `Thứ ${date.getDay()+1}`} :  {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}{" "}
          </div>

          <div className="times">
            {array.map((item, index) => {
               const time = new Date(item.times.time);
              //  if (item.day == date.getDay() + 1 && time.getDate() == date.getDate()) {
              //   return (
              //     <button type="button" key={index} className="btn btn-outline-danger" style={{width:"80px"}}>
              //       {time.getHours()} : {time.getMinutes()} 
              //     </button>
              //   );
              // }
              if (date.getDay()+1 >6){
                if(item.day == date.getDay()+1-7 &&time.getDate() == date.getDate() ) {
                  console.log(time.getDate() ,date.getDate())
                  return (
                    <button type="button" key={index} className="btn btn-outline-danger">
                      {time.getHours()} : {time.getMinutes()} 
                    </button>
                  );
                }
               }
               if(item.day == date.getDay() + 1 && time.getDate() == date.getDate()) {
                return (
                  <button type="button" key={index} className="btn btn-outline-danger" style={{width:80}}>
                    {time.getHours()}:{time.getMinutes()} 
                  </button>
                );
              }
            })}
          </div>
        </div>


       {/* 222222 */}
       <div className="date_show">
          <div className="day">
          {date.getDay()+2 >8 && `Thứ ${date.getDay()+3-7}`}{date.getDay()+2 ==8 && "Chủ nhật"}{date.getDay()+2<=7 && `Thứ ${date.getDay()+2}`} :  {date.getDate()+1}-{date.getMonth() + 1}-{date.getFullYear()}{" "}
          </div>

          <div className="times">
            {array.map((item, index) => {
               const time = new Date(item.times.time);
              // if (item.day == date.getDay() + 2 && time.getDate() == date.getDate()+1) {
               
              //   return (
              //     <button type="button" key={index} className="btn btn-outline-danger" style={{width:80}}>
              //       {time.getHours()}:{time.getMinutes()} 
              //     </button>
              //   );
              // }

              if (date.getDay()+2 >6){
                if(item.day == date.getDay()+2-7 &&time.getDate() == date.getDate()+1 ) {
                  console.log(time.getDate() ,date.getDate()+1)
                  return (
                    <button type="button" key={index} className="btn btn-outline-danger">
                      {time.getHours()} : {time.getMinutes()} 
                    </button>
                  );
                }
               }
               if(item.day == date.getDay() + 2 && time.getDate() == date.getDate()+1) {
                return (
                  <button type="button" key={index} className="btn btn-outline-danger" style={{width:80}}>
                    {time.getHours()}:{time.getMinutes()} 
                  </button>
                );
              }
            })}
          </div>
        </div>


      {/* {333333333333333} */}
      <div className="date_show">
          <div className="day">
          {date.getDay()+3 >8 && `Thứ ${date.getDay()+3-7}`}{date.getDay()+3 ==8 && "Chủ nhật"}{date.getDay()+3<=7 && `Thứ ${date.getDay()+3}`} :  {date.getDate()+2}-{date.getMonth() + 1}-{date.getFullYear()}{" "}
          </div>

          <div className="times">
            {array.map((item, index) => {
               const time = new Date(item.times.time);
               if (date.getDay()+3 >6){
                if(item.day == date.getDay()+3-7 &&time.getDate() == date.getDate()+2 ) {
                  console.log(time.getDate() ,date.getDate()+2)
                  return (
                    <button type="button" key={index} className="btn btn-outline-danger">
                      {time.getHours()} : {time.getMinutes()} 
                    </button>
                  );
                }
               }
               if(item.day == date.getDay() + 3 && time.getDate() == date.getDate()+2) {
                return (
                  <button type="button" key={index} className="btn btn-outline-danger" style={{width:80}}>
                    {time.getHours()}:{time.getMinutes()} 
                  </button>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowTimeDetail;
