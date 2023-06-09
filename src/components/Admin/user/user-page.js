import "./index.css";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Image, message, Modal } from "antd";
import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import User_Detail from "./user-detail";

const UserPage = (props) => {
  const { users, load, setLoad } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [user,setUser] = useState({});
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm({
      closeDropdown: false,
    });
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const confirmClose = (confirm) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            handleSearch(selectedKeys, confirm, dataIndex);
          }}
          onPressEnter={() => {
            handleSearch(selectedKeys, confirm, dataIndex);
            confirmClose(confirm);
          }}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              handleSearch(selectedKeys, confirm, dataIndex);
              confirmClose(confirm);
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(value.toLowerCase().trim().replace(/\s/g, "")),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",

      ...getColumnSearchProps("email"),
      render: (_, record) => (
        <div
          style={{
            textAlign: "left",
            fontSize: "20",
            fontWeight: 550,
            color: "#222",
          }}
        >
          {" "}
          {record.email}{" "}
        </div>
      ),
    },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "username",
      width: "20%",

      ...getColumnSearchProps("username"),
      render: (_, record) => (
        <div
          style={{
            textAlign: "left",
            fontSize: "20",
            fontWeight: 550,
            color: "#222",
          }}
        >
          {" "}
          {record.username}{" "}
        </div>
      ),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: "20%",

      render: (_, record) => (
        <Image
          style={{ textAlign: "center" }}
          width={100}
          src={record.avatar}
        />
      ),
    },
    {
      title: "Trạng thái",
    //   dataIndex: "admin",
    //   key: "admin",
      width: "20%",

      ...getColumnSearchProps("admin"),
      render: (_, record) =>{
         const admin = record.admin;   
        return (
            <>
            {admin ? (<>
                <Button
            type="primary" 
            danger
            onClick={(e) => {
              e.preventDefault();
              // setMoiveItem(record)
            //   showModal();
            }}
            
          > 
          Quản lý
          </Button> 
            </>) :(<>
                <Button
            type="primary" 
            // danger
            onClick={(e) => {
              e.preventDefault();
              // setMoiveItem(record)
            //   showModal();
            }}
            
          > 
          Người dùng
          </Button> 
            </>)

           }
           </>
           
        )

      }
    },

    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={(e) => {
              e.preventDefault();
              // setMoiveItem(record)
              setUser(record)
              showModal();
            }}
            className="navbar-register"
          >
            Xem chi tiết{" "}
          </Button>
          <Button
            type="primary"
            onClick={(e) => {
              e.preventDefault();
              setUser(record)
              showModal1();
            }}
            danger
          >
            Khóa tài khoản
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {}, [load]);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  
  };


  const handleOk1 = async() => {
    await axios.delete(`/api/auth/${user._id}`).then(res=>{
      if(res.data.success){
        message.success("Khóa thành công")
        setLoad(!load)
        setIsModalOpen1(false);
      }
      else{
        message.success("Khóa không thành công")
      }
    })
   
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  
  };
  return <>
    <Table
 
 rowKey={record => record._id}
  columns={columns}
//   expandable={{
//    expandedRowRender: (record) => (
//      <>
//      <p
//        style={{
//          margin: 0,
//        }}
//      >
//       Mô tả:  {record.description}
//      </p>
   
//      </>
     
//    ),
//    rowExpandable: (record) => record.name !== 'Not Expandable',
//  }}
  
  dataSource={users}  />;

<Modal width={1000} title="Chi tiết tài khoản" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <User_Detail load={load} user={user} setLoad ={setLoad}></User_Detail>
</Modal> 

<Modal width={1000} title="Bạn có muốn khóa tài khoản này không" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
     
</Modal> 
  
  </>;
};

export default UserPage;
