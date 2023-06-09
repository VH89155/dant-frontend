import NewsHome from "../../components/Web/News/news-home/news-home";
import { useState, useEffect } from "react";
import axios from "axios";
const News = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fechData = async () => {
          await axios.get("https://project-datn.herokuapp.com/api/new").then((res) => {
            console.log(res.data);
            setData(res.data.new);
          });
        };
        fechData();
      },[]);
    return ( <>
     <NewsHome  data={data}></NewsHome>
    </> );
}
 
export default News;