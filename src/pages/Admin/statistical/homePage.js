import axios from "axios";
import { useEffect, useState } from "react";
import { Bar , Line } from "react-chartjs-2";
import BarChart from "../../../components/Admin/Chart/BarChart";
import LineChart from "../../../components/Admin/Chart/LineChart";


const HomPage_statistical = () => {
    const [moives,setmoives] = useState([])
    const [fullMonth,setfullMonth] = useState([])

    useEffect(()=>{
        const fecth = async()=>{
            await axios.get("https://project-datn.herokuapp.com/api/statistical/moive/totalAll").then((res)=>{
               setmoives(res.data)
            })
            await axios.get("https://project-datn.herokuapp.com/api/statistical/fullMonth").then((res)=>{
                setfullMonth(res.data)
            }
            )
        }
        fecth()
    },[])
    const TotalData = {
        labels: moives.map(item=> item.name),
        datasets:[
            {
                label: "Doanh thu các phim đang chiếu ",
                data: moives.map(item=> item.tongTienVe),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                  ],
                  borderColor: "black",
                  borderWidth: 1,

            }
        ]
    }
    const DataMonth ={
        labels:[1,2,3,4,5,6,7,8,9,10,11,12],
        datasets: [
            
                {
                    data: fullMonth.map(item=>item.total.TotalVe),
                    label:"Tổng tiền vé thu được",
                    borderColor: "#3cba9f",
                    fill:false,

                },
                {
                    data: fullMonth.map(item=>item.total.Total),
                    label:"Tổng tiền vé + combo thu được",
                    borderColor: "#8e5ea2",
                    fill:false,

                }
            
        ]
    }

    return (
         <>
<BarChart chartData ={TotalData} ></BarChart>
<LineChart  chartData={DataMonth} ></LineChart>
    
         </>
     );
}
 
export default HomPage_statistical;