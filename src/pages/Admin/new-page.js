
import { useState, useEffect } from "react";

import axios from "axios";
import Content_New from "../../components/Admin/Page-manege/content-new";


const New_Manage = () => {
  const [value, setValue] = useState(1);
  const [ load,setLoad] = useState(false)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

 
  useEffect(() => {
    const fechData = async () => {
      await axios.get("/api/new").then((res) => {
        console.log(res.data);
        setData(res.data.new);
      });
    };
    fechData();
  },[value,loading,load]);
  return (
    <>

            <Content_New data={data} value={value} setValue={setValue}
                loading={loading} setLoad={setLoad}  setLoading = {setLoading}           
            ></Content_New>
          
    
    </>
  );
};

export default New_Manage;
