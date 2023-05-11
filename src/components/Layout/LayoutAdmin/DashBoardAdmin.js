import "./index.css"
import { FileOutlined, PieChartOutlined, UserOutlined,TeamOutlined } from '@ant-design/icons';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  FileAddOutlined,
  FieldTimeOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme,Breadcrumb } from 'antd';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
const { Header, Sider, Content } = Layout;


const App = ({children}) => {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
     
    };
  }
  const items = [
    getItem('Option 1', '1',<Link><PieChartOutlined /> </Link> ),
    getItem('Option 2', '2',<Link to=""><DesktopOutlined /></Link> ),
    getItem('Phim', 'sub1', <VideoCameraOutlined />, [
      getItem('Danh sách phim', '3', <Link to="/admin/moive"><FileDoneOutlined /></Link>),
      getItem('Thêm phim mới', '4',<Link to="/admin/add-moive"><FileAddOutlined /></Link>),
      getItem('Phim đã xóa', '5',<Link to="/admin/trash-moive"><FileAddOutlined /></Link>),
    ]),
    getItem('Lịch chiếu', 'sub2', <FieldTimeOutlined />,
     [getItem('Danh sách lịch chiếu', '6', <Link to="/admin/show-time"><FileDoneOutlined /></Link>),
    getItem('Thêm lịch chiếu', '9', <Link to="/admin/add-show-time"><FileAddOutlined /></Link>),
  ])
]
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            paddingLeft:40 ,
            background: colorBgContainer,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        {/* <Breadcrumb
            style={{
              margin: '16px 0',
              paddingLeft:40
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;