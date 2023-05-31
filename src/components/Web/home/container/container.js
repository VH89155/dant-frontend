import { Link } from "react-router-dom";
import "./container.css";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import {getAllMoive} from "../../../../redux/apiRequest"

const Container = () => {
  const [dangchieu,setDangchieu] = useState(true)
  const dispatch = useDispatch();
  const [allMoive,setAllMoive] = useState(
    useSelector((state)=>state.moive?.moives?.allMoives)
  )
  useEffect(()=>{

   const fetchData = async()=>{
    
    await  axios.get("/api/moive").then((res)=>res.data)
    .then((res)=>{
     setAllMoive(res.moives);
     // console.log(res.moives)
     return res.moives
    })
    getAllMoive(dispatch)
   }
  fetchData()
  

  },[dangchieu])
 
  return (
    <>
      <div class="most-popular">
        <div class="row ">
          <div class="col col-lg-12">
            <div class="heading-section">
              {dangchieu ? (
                <>
                <h3 className="active">
                <em>PHIM ĐANG CHIẾU  {}</em>{" "}
              </h3>
                <h3 style={{cursor:"pointer"}} onClick={()=>{
                  setDangchieu(false);
                }}> PHIM SẮP CHIẾU</h3>
                </>
              ):(<>
                <h3 className="active" >
                <em>PHIM SẮP CHIẾU {}</em>{" "}
              </h3>
                <h3 style={{cursor:"pointer"}} onClick={()=>{
                  setDangchieu(true);
                }}>PHIM ĐANG CHIẾU  </h3>
              </>)

              }
              
            </div>
            {dangchieu ? (<>
              <div class="row scroll">
              {allMoive?.map((moive,index)=>{
                  const time =new Date(moive.premiere_date)
                  const date = new Date()
                  date.setHours(0)
                  date.setMinutes(0)
                  
                  console.log(date.getDay());
                  if(time <date){
                    return(
                      <div class="col-lg-3 col-sm-6" style={{marginBottom:20}} key={index}>
                      <Link to={`details/${moive._id}`}> <div class="item_moive">
                         <img
                          src={moive?.images[0]}
                          alt=""
                        ></img>
                      
                        {/* <p>{moive.age}</p> */}
                        <div className="item_moive-hover">
                          <p className="moive-name">{moive?.name}</p>
                          <p className="font-light">
                              Thể loại: {moive?.category.map((item,index,arr)=>{
                                if(index === arr.length-1){
                                  return (
                                    `${item}.`
                                  )
                                }
                                else if(index !== arr.length-1){
                                  return (
                                    `${item}, `
                                  )
                                }
    
                              })}
                            <br></br>
                            Khởi chiếu: {time.getDate()}/{time.getMonth()+1}/{time.getFullYear()}
                          </p>
                          <Link to ={`/ticket-booking?moiveID=${moive._id}`}  className="btn-datve">ĐẶT VÉ</Link>
                     
                      </div>
                      </div>
                      
                      </Link>
                    </div>
                    )
                  }
              
              })}
             
              
             
            </div>
            </>)


              :(<>
               <div class="row scroll">
              {allMoive?.map((moive,index)=>{
                  const time =new Date(moive.premiere_date)
                  const date = new Date()
                  date.setHours(0)
                  date.setMinutes(0)
                  
                  console.log(date.getDay());
                  if(time > date){
                    return(
                      <div class="col-lg-3 col-sm-6" style={{marginBottom:20}} key={index}>
                      <Link to={`details/${moive._id}`}> <div class="item_moive">
                         <img
                          src={moive?.images[0]}
                          alt=""
                        ></img>
                      
                        {/* <p>{moive.age}</p> */}
                        <div className="item_moive-hover">
                          <p className="moive-name">{moive?.name}</p>
                          <p className="font-light">
                              Thể loại: {moive?.category.map((item,index,arr)=>{
                                if(index === arr.length-1){
                                  return (
                                    `${item}.`
                                  )
                                }
                                else if(index !== arr.length-1){
                                  return (
                                    `${item}, `
                                  )
                                }
    
                              })}
                            <br></br>
                            Khởi chiếu: {time.getDate()}/{time.getMonth()+1}/{time.getFullYear()}
                          </p>
                          {/* <Link  className="btn-datve">ĐẶT VÉ</Link> */}
                      </div>
                      </div>
                      
                      </Link>
                    </div>
                    )
                  }
              
              })}
             
              
             
            </div>
              </>)

            }
         
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
