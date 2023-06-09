import { useEffect, useState } from "react";
import Sidebar from "../../../components/Web/custom_account/sidebar";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import Content_Ticket from "../../../components/Web/custom_account/content_ticket";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Content_Transaction from "../../../components/Web/custom_account/content-transaction";

const TransactionHistory = () => {
  
  const [load, setLoad] = useState(false);
  const [tickets,setTickets] = useState([])
  const auth = useSelector((state) => state.auth?.login);
  const navigate = useNavigate()
  
  const namePage = "transaction";
  useEffect(() => {
    const fetchData = async () =>{

        await  axios.get(`/api/ticket/user/${auth?.currentUser?.info._id}`)
        .then((res)=> {
            console.log(res.data) 
            setTickets(res.data)
        }).catch((err) => {console.log(err)})

    }
    fetchData()
    if(auth.currentUser ===null){
      navigate("/")
  }
  }, [load]);

  return (
    <>
      <div className="container custom_account">
        <Spin tip="Loading..." spinning={auth?.isFetching}>
          <Sidebar namePage={namePage} setLoad={setLoad} auth={auth}></Sidebar>
        <Content_Transaction tickets={tickets} setLoad={setLoad} load={load}></Content_Transaction>
        </Spin>
      </div>
    </>
  );
};

export default TransactionHistory;
