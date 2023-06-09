
import "./index.css"
import { Link   } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table,Image,message,Modal } from 'antd';
import React, { useRef, useState, useEffect, useContext } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import axios from "axios";


const Content_trash = (props) => {
    let {users ,load,setLoad} =props 
    const [edit,isEdit] = useState(true)
    const [userItem,setUserItem] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
      
    };
    const showModal1 = (id) => {
      setIsModalOpen1(true);
      
      
    };
    const handleOk =async() => {
      
      // await axios.patch(`/api/moive/restore/${moiveItem._id}`).then((res)=>{
      //   console.log(res.data)
      //   setIsModalOpen1(false);
      //   setLoad(!load)     
        
      // })

      
    };
    const handleOk1 = async() => {
      await axios.patch(`/api/auth/restore/${userItem._id}`).then((res)=>{
        console.log(res.data)
        setIsModalOpen1(false);
        setLoad(!load)     
        
      })

      
    };
    const handleCancel1 = () => {
      setIsModalOpen1(false);
      isEdit(true)
    };
    const handleCancel = () => {
      setIsModalOpen(false);
      isEdit(true)
    };

    // console.log(moives)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm({
          closeDropdown: false,
        });
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      const confirmClose =(confirm)=>{
          confirm();
      }
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
      };
      const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div
            style={{
              padding: 8,
            }}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) =>{
                  setSelectedKeys(e.target.value ? [e.target.value] : [])       
                  handleSearch(selectedKeys, confirm, dataIndex)} }
              onPressEnter={() =>{handleSearch(selectedKeys, confirm, dataIndex)
                  confirmClose(confirm)}}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => {handleSearch(selectedKeys, confirm, dataIndex)
                  confirmClose(confirm)}}
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
              color: filtered ? '#1890ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
           record[dataIndex].toString().replace(/\s/g, '').toLowerCase().includes(value.toLowerCase().trim().replace(/\s/g, '')),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
         
          text
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
          title: 'Hành động',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              
            <Button type="primary" onClick={(e)=>{
                e.preventDefault();
                setUserItem(record)
                showModal1()
            }}  className="navbar-register" >
            Khôi phục </Button>
            <Button type="primary" onClick={(e)=>{
                e.preventDefault();    
                setUserItem(record)            
                showModal()
            }} danger >Xóa</Button>
            </Space>
          ),
        },
      ];
      useEffect(()=>{
        
      },[edit])
    return (<>
    <Table
 
 rowKey={record => record._id}
  columns={columns}
  expandable={{
   expandedRowRender: (record) => (
     <>
     <p
       style={{
         margin: 0,
       }}
     >
      Mô tả:  {record.description}
     </p>
   
     </>
     
   ),
   rowExpandable: (record) => record.name !== 'Not Expandable',
 }}
  
  dataSource={users}  />;


    <Modal width={1000} title="Bạn có muốn khôi phục lại không" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
        
      </Modal> 

     <Modal width={1000} title="Bạn chắc chắn muốn xóa tài khoản vĩnh viễn chứ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       
     </Modal>   
    </>  );
}
 
export default Content_trash;