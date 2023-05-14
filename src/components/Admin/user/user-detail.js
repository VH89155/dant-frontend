import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import Ticket_User from "./tickets_user";

const User_Detail = (props) => {
  const { user, load, setLoad } = props;
  const [tickets, setTickets] = useState([]);
  console.log(user);
  const UserInfo = (
    <div className="top">
      <img src={user?.avatar}></img>
      <div className="profile">
        <p>
          {" "}
          <span>Địa chỉ email: </span> {user?.email}{" "}
        </p>
        <p>
          {" "}
          <span>Tên tài khoản: </span> {user?.username}{" "}
        </p>
        <p>
          <span>Họ và tên: </span> {user?.fullName}{" "}
        </p>
        <p>
          <span>Số điện thoại: </span> {user?.phoneNumber}{" "}
        </p>
        <p>
          <span>Địa chỉ: </span> {user?.address}{" "}
        </p>
      </div>
    </div>
  );
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/api/ticket/user/${user._id}`).then((res) => {
        setTickets(res.data);
      });
    };
    fetchData();
  }, [user]);
  return (
    <>
      <div className="user-show">
        {UserInfo}
        <div className="bottom">
          <Ticket_User tickets={tickets}></Ticket_User>
        </div>
      </div>
    </>
  );
};

export default User_Detail;
