import "./index.css";

import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  FileAddOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const { Header, Sider, Content } = Layout;

const App = ({ children }) => {
  
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(
      "Option 1",
      "1",
      <Link>
        <PieChartOutlined />{" "}
      </Link>
    ),
    getItem(
      "Option 2",
      "2",
      <Link to="">
        <DesktopOutlined />
      </Link>
    ),
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
        <Link to="">
          <UserAddOutlined />
        </Link>
      ),
    ]),
    getItem("quản lí page", "sub5", <UserOutlined />, [
      getItem(
        "quản lí tin tức ",
        "12",
        <Link to="/admin/news">
          <FileDoneOutlined />
        </Link>
      ),
      getItem(
        "Thêm người dùng",
        "13",
        <Link to="">
          <UserAddOutlined />
        </Link>
      ),
     
    ]),
    getItem(
      "Quản lí vé",
      "15",
      <Link to={"/admin/tickets"}>
        <PieChartOutlined />{" "}
      </Link>
    ),
    getItem(
      "Quản lí mã giảm giá",
      "16",
      <Link to={"/admin/discount"}>
        <PieChartOutlined />{" "}
      </Link>
    ),
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate()
  const auth = useSelector((state)=>state.auth?.login?.currentUser.info?.admin)
  console.log(auth)
  useEffect(()=>{
    const fetch = async()=>{
      await axios.get("/api/show-time")
    }
    fetch()
  },[])
  return (<>
    {auth? (<>
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
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
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
