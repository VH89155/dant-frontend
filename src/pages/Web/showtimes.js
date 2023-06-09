import App from "../../components/Web/show-time";
import axios from "axios"
import {useState,useEffect} from "react"

const ShowTimes = () => {
    const [data,setData] = useState([])
    useEffect(() =>{
        
        axios.post("https://project-datn.herokuapp.com/api/moive/moive-time")
        .then((res)=> {
            // console.log(res.data)
            setData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })


    },[])
    return ( <>
        <App data ={data}></App>
    </> );
}
 
export default ShowTimes;