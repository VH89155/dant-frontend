
import { Select } from 'antd';
import { Link } from 'react-router-dom';
const Booking_time = (props) => {
    const {setTime,showTimes} = props;
    const times = new Date()
    const arrayTime =[]
    console.log(showTimes)
//   console.log("time: Thứ ", (times.getDay() + 1)+ ", " + times.getDate() +  "-" + (times.getMonth()+1), "-",times.getFullYear() )
  
  for(let i=0; i<10;i++){
    const time = new Date()
    time.setDate(times.getDate()+i)
    if(time.getDay()== 0){
        arrayTime.push({
            key: `${time.getDate()}-${time.getMonth()+1}-${time.getFullYear()}`,
            value: `Chủ nhật, ${time.getDate()}-${time.getMonth()+1}-${time.getFullYear()} `
        })
    }
     else if(time.getDay()<= 6){
        arrayTime.push({
            key: `${time.getDate()}-${time.getMonth()+1}-${time.getFullYear()}`,
            value: `Thứ ${time.getDay()+1}, ${time.getDate()}-${time.getMonth()+1}-${time.getFullYear()} `
        })
    }
 
  
  };
//   console.log(arrayTime)
  const handleChange = (value) => {
    console.log(value); 
    setTime(value.key)

  }
    return ( 
<>
        <Select
    labelInValue
    defaultValue={arrayTime[0]
    }
    style={{
      width: 300,
    }}
    onChange={handleChange}
    options={
        arrayTime
    }
  />
  <div>
    <div className='moive-time'>
        {showTimes && 
        ( <>
          {
            showTimes.map((item, index)=>{

                return (
              
                <>
                  {item.time.length !==0  && (<>
                    <div className='label-name' key={index}>{item.moive.name}, {item.date}, {item.moive.age}</div>
                    {item?.time.map((item,index)=>{
                        const time = new Date(item.time)
                        return (
                          <Link to ={`/book-ticket/${item._id}`}> <button type="button" key={index} className="btn btn-outline-danger" style={{marginRight: 20}}>
                            { time.getHours() >9 ? time.getHours() :`0${ time.getHours()}`} :  { time.getMinutes() >9 ? time.getMinutes() : `${time.getMinutes()}0`}
                    </button>
                    </Link> 
                        )
                    })}
                    
                  </>)} 
                   
                </>
                
                
                
                )
            }
           
            )
          }
        
        </>)}
    </div>
  </div>
  </>
     );
}
 
export default Booking_time;