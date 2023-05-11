import "./ticket-booking.css";
import { useEffect, useState } from "react";
import { Select } from "antd";
import { Link } from "react-router-dom";

import { Modal } from "antd";
import SHowTime_Detail from "../../Admin/showtime/showTime-detail";
const Booking_time = (props) => {
const { setTime, showTimes, admin, load, setLoad } = props;
const times = new Date();
const arrayTime = [];
console.log(showTimes);
  //   console.log("time: Thứ ", (times.getDay() + 1)+ ", " + times.getDate() +  "-" + (times.getMonth()+1), "-",times.getFullYear() )

  for (let i = 0; i < 10; i++) {
    const time = new Date();
    time.setDate(times.getDate() + i);
    if (time.getDay() == 0) {
      arrayTime.push({
        key: `${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}`,
        value: `Chủ nhật, ${time.getDate()}-${
          time.getMonth() + 1
        }-${time.getFullYear()} `,
      });
    } else if (time.getDay() <= 6) {
      arrayTime.push({
        key: `${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}`,
        value: `Thứ ${time.getDay() + 1}, ${time.getDate()}-${
          time.getMonth() + 1
        }-${time.getFullYear()} `,
      });
    }
  }
  //   console.log(arrayTime)
  const handleChange = (value) => {
    console.log(value);
    setTime(value.key);
  };


  /// admin  
  const [isModalOpen1 ,setIsModalOpen1] =useState(false)

  const [showTime, setShowTime] = useState({})
    const showModal1 = () => {
        setIsModalOpen1(true);    
      };      
      const handleOk1 = async() => { 
        setIsModalOpen1(false);      
      };
      const handleCancel1 = () => {
        setIsModalOpen1(false);        
      };
   
  return (
    <>
      <Select
        labelInValue
        defaultValue={arrayTime[0]}
        style={{
          width: 300,
        }}
        onChange={handleChange}
        options={arrayTime}
      />
      <div>
        <div className="moive-time">
          {showTimes && (
            <>
              {showTimes.map((item, index) => {
                return (
                  <>
                    {item.time.length !== 0 && (
                      <>
                        <div className="label-name" key={index}>
                          {item.moive.name}, {item.date}, {item.moive.age}
                        </div>
                        {item?.time.map((item, index) => {
                          const time = new Date(item.time);
                          return (
                             <>
                             { admin ?
                              (<> 
                                 <button
                                type="button"
                                key={index}
                                onClick={()=>{
                                  showModal1();
                                  setShowTime(item)
                                
                                }}
                                className="btn btn-outline-danger"
                                style={{ marginRight: 20 }}
                              >
                                {time.getHours() > 9
                                  ? time.getHours()
                                  : `0${time.getHours()}`}{" "}
                                :{" "}
                                {time.getMinutes() > 9
                                  ? time.getMinutes()
                                  : `${time.getMinutes()}0`}
                              </button>
                               </>):
                             
                             (<>
                              <Link to={`/book-ticket/${item._id}`}>
                              {" "}
                              <button
                                type="button"
                                key={index}
                                className="btn btn-outline-danger"
                                style={{ marginRight: 20 }}
                              >
                                {time.getHours() > 9
                                  ? time.getHours()
                                  : `0${time.getHours()}`}{" "}
                                :{" "}
                                {time.getMinutes() > 9
                                  ? time.getMinutes()
                                  : `${time.getMinutes()}0`}
                              </button>
                            </Link>
                             </>)

                             }
                           
                            </>
                          );
                        })}
                      </>
                    )}
                  </>
                );
              })}
              <Modal width={1000} title="Chi tiết lịch chiếu" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
                <SHowTime_Detail load={load} setLoad={setLoad} showTime ={showTime}></SHowTime_Detail>
              </Modal> 
            </>
          )}
        </div>
      </div>
      
    </>
  );
};

export default Booking_time;
