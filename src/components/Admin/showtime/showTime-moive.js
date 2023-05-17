import { useEffect ,useState} from "react";
import SHowTime_Detail from "./showTime-detail";
import { Modal } from "antd";

const ShowTimeAll_Moive = (props) => {
  const { showTimes, load, setLoad } = props;
  const [edit,setEdit] = useState(false)
  console.log(showTimes);

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


  useEffect(() => {}, [showTimes]);
  return (
    <>
      {showTimes && (
        <>
          {showTimes.map((item, index) => {
            console.log("showTimes" , item)
            return (
              <>
                <div className="label-name" key={index}>
                  {item.moive.name}, {item.date}, {item.moive.age}


                  {item?.time?.map((items, index) => {
                    console.log(items);
                    return (
                      <>
                        <p key={index}>{items.date}</p>
                        {items?.array?.map((item, index) => {
                          const time = new Date(item.time);
                          return (
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
                          );
                        })}
                      </>
                    );
                  })}
                </div>
              </>
            );
          })}
        </>
      )}

    <Modal width={1000} title="Chi tiết lịch chiếu" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
            <SHowTime_Detail edit={edit}  setIsModalOpen1 ={setIsModalOpen1}setEdit={setEdit} load={load} setLoad={setLoad} showTime ={showTime}></SHowTime_Detail>
    </Modal> 
    </>
  );
};

export default ShowTimeAll_Moive;
