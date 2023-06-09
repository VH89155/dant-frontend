import "./index.css";

import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  TeamOutlined,
  UserAddOutlined,
  FundOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  FileAddOutlined,
  FieldTimeOutlined,
  LockOutlined,
  PictureOutlined
} from "@ant-design/icons";

import { Layout, Menu, theme, Breadcrumb, Button,Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logOut } from "../../../redux/apiRequest";
const { Header, Sider, Content } = Layout;

const App = ({ children }) => {
  const dispatch = useDispatch()
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem( "Tổng quan",
      "0",
      <Link to="/admin">
        <FundOutlined />{" "}
      </Link>
    ),
    getItem("Thống kê chung", "sub6", <PieChartOutlined />, [
      getItem(
        "Thống kê phim",
        "1",
        <Link to="/admin/statistical">
          <PieChartOutlined />{" "}
        </Link>
      ),
      
    ]),
   
   
    getItem("Phim", "sub1", <VideoCameraOutlined />, [
      getItem(
        "Danh sách phim",
        "3",
        <Link to="/admin/moive">
          <FileDoneOutlined />
        </Link>
      ),
      getItem(
        "Thêm phim mới",
        "4",
        <Link to="/admin/add-moive">
          <FileAddOutlined />
        </Link>
      ),
      getItem(
        "Phim đã xóa",
        "5",
        <Link to="/admin/trash-moive">
          <FileAddOutlined />
        </Link>
      ),
    ]),
    getItem("Lịch chiếu", "sub2", <FieldTimeOutlined />, [
      getItem(
        "Danh sách lịch chiếu",
        "6",
        <Link to="/admin/show-time">
          <FileDoneOutlined />
        </Link>
      ),
      getItem(
        "Thêm lịch chiếu",
        "9",
        <Link to="/admin/add-show-time">
          <FileAddOutlined />
        </Link>
      ),
      getItem(
        "Lịch chiếu hoàn tất",
        "20",
        <Link to="/admin/show-time-success">
          <FileAddOutlined />
        </Link>
      ),
    ]),
   
  
    getItem("Vé",
      "sub10",
      <FileDoneOutlined />,
      [
        getItem(
          "Quản lý Vé ",
          "15",
          <Link to={"/admin/tickets"}>
        <PieChartOutlined />{" "}
       </Link>
        ),
        getItem(
          "Gía vé ",
          "25",
          <Link to={"/admin/price-ticket"}>
            <PieChartOutlined />{" "}
          </Link>
        ),
      ]

     
    ),
    getItem(
      "Mã giảm giá",
      "16",
      <Link to={"/admin/discount"}>
        <FileDoneOutlined />{" "}
      </Link>
    ),
    getItem("Combo đồ ăn", "sub10", <Link to="/admin/add-combo">
    <FileDoneOutlined />
  </Link>),
    getItem("Phòng chiếu",
      "22",
      <Link to={"/admin/room"}>
        <FileDoneOutlined />{" "}
      </Link>
    ),
      getItem("quản lí page", "sub5", <FileDoneOutlined />, [
      getItem(
        "quản lí tin tức ",
        "12",
        <Link to="/admin/news">
          <FileDoneOutlined />
        </Link>
      ),
      getItem(
        "Quản lý banner quảng cáo",
        "13",
        <Link to="/admin/banner-page">
          <PictureOutlined />
        </Link>
      ),
    
     
    ]),
    getItem("Tài khoản", "sub3", <UserOutlined />, [
      getItem(
        "Danh sách người dùng",
        "10",
        <Link to="/admin/user">
          <FileDoneOutlined />
        </Link>
      ),
      getItem(
        "Thêm người dùng",
        "11",
        <Link to="/admin/user/add">
          <UserAddOutlined />
        </Link>
      ),
      getItem(
        "Tài khoản đã khóa",
        "55",
        <Link to="/admin/user/trash">
           <LockOutlined />
        </Link>
      ),
    
    ]),
   
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate()
  const auth = useSelector((state)=>state.auth?.login)
  console.log(auth?.currentUser.info?.admin)
  useEffect(()=>{
    const fetch = async()=>{
      await axios.get("https://project-datn.herokuapp.com/api/show-time")
    }
    fetch()
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };
    scrollToTop()
  },[auth])
  return (<>
    {auth?.currentUser.info?.admin? (<>
      <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            paddingLeft: 40,
            background: colorBgContainer,
            position:"relative",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div style={{position:"absolute" ,top: 0, right:50}}>
          <img src={auth?.currentUser.info?.avatar} style={{borderRadius:"50%", width:"30px"}}></img> 
           <Button type="text" danger onClick={()=>{
             console.log("hello", auth?.token);
             logOut(dispatch, navigate, auth?.token);
           }} >Đăng xuất</Button>
           
            </div>
        </Header>
        
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
      </>): (<>
        <h1 style={{textAlign:"center", paddingTop:"200" , color:"#222"}}>404</h1>
    </>)

    }
  </>
  );
};
export default App;
