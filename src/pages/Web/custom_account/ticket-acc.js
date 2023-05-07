import { useEffect, useState } from "react";
import Sidebar from "../../../components/Web/custom_account/sidebar";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import Content_Ticket from "../../../components/Web/custom_account/content_ticket";
import axios from "axios";

const Ticket_Acc = () => {
  
  const [load, setLoad] = useState(false);
  const [tickets,setTickets] = useState([])
  const auth = useSelector((state) => state.auth?.login);
  const namePage = "ticket";
  useEffect(() => {
    const fetchData = async () =>{

        await  axios.get(`http://localhost:8080/api/ticket/user/${auth?.currentUser?.info._id}`)
        .then((res)=> {
            console.log(res.data) 
            setTickets(res.data)
        }).catch((err) => {console.log(err)})

    }
    fetchData()
      
  }, [load]);

  return (
    <>
      <div className="container custom_account">
        <Spin tip="Loading..." spinning={auth?.isFetching}>
          <Sidebar namePage={namePage} setLoad={setLoad} auth={auth}></Sidebar>

        <Content_Ticket tickets={tickets}></Content_Ticket>
       
        </Spin>
      </div>
    </>
  );
};

export default Ticket_Acc;
