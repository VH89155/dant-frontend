import "./ticket-booking.css";
import { useEffect, useState } from "react";
import { Select } from "antd";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import SHowTime_Detail from "../../Admin/showtime/showTime-detail";


import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const dateFormat = 'D-M-YYYY';






const Booking_time = (props) => {
  const [edit,setEdit] = useState(false)
const { setTime, showTimes, admin, load, setLoad,value } = props;
const times = new Date();
const arrayTime = [];
console.log(showTimes);
  //   console.log("time: Thứ ", (times.getDay() + 1)+ ", " + times.getDate() +  "-" + (times.getMonth()+1), "-",times.getFullYear() )

  if(admin && value === 2){
    for (let i = 1; i <= 15; i++) {
      const time = new Date();
      time.setDate(times.getDate() - i);
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
  }

  else if(!admin || (admin && value ===1 )){
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
        setEdit(false)    
        setLoad(!load) 
      };
      const handleCancel1 = () => {
        setIsModalOpen1(false); 
        setEdit(false)    
        setLoad(!load)       
      };


      const onChangeDate = (date) => {
        if (date) {
          console.log('Date: ', date);
          const time = new Date(date);
          console.log('Date: ', `${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}`);
          setTime(`${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}`)

        } else {
          console.log('Clear');
        }
      };
      const customFormat = (value) => {
        const time = new Date(value);
        if (time.getDay() == 0) { 
        
            return`Chủ nhật, ${time.getDate()}-${
              time.getMonth() + 1
            }-${time.getFullYear()} `
         
        } 
        else if (time.getDay() <= 6) {
          
            return `Thứ ${time.getDay() + 1}, ${time.getDate()}-${
              time.getMonth() + 1
            }-${time.getFullYear()} `
        
        }
        
      // return  `custom format: ${value.format(dateFormat)}`
      };
  return (
    <>
    { value !==3 ? (<>
      <Select
        labelInValue
        defaultValue={arrayTime[0]}
        style={{
          width: 300,
        }}
        onChange={handleChange}
        options={arrayTime}
      />
    </>)
    
    
    :(<>
      <DatePicker  style={{
          width: 300,
        }} onChange={onChangeDate} defaultValue={dayjs(`${times.getDate()}-${times.getMonth() + 1}-${times.getFullYear()}`, dateFormat)} format={customFormat} />
    </>)

    }
      
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
                <SHowTime_Detail edit={edit} setEdit={setEdit} load={load} setLoad={setLoad} showTime ={showTime}></SHowTime_Detail>
              </Modal> 
            </>
          )}
        </div>
      </div>
      
    </>
  );
};

export default Booking_time;
