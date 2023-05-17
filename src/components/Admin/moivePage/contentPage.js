
import "./index.css"
import { Link   } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table,Image,message,Modal } from 'antd';
import React, { useRef, useState, useEffect, useContext } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import MoiveShow from "./moive-show";
import axios from "axios";


const Content_pageMoive = (props) => {
    let {moives ,load,setLoad} =props
    const allmoives = moives?.map(item =>{
        const time = new Date(item.premiere_date)
        const timeReal = item.premiere_date
        return {
            ...item,
            timeReal,
            premiere_date: `${time.getDate()}-${time.getMonth()+1}-${time.getFullYear()}`,
            
        }
    })
    const [edit,isEdit] = useState(true)
    console.log(allmoives)
    const [moiveItem,setMoiveItem] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
      
    };
    const showModal1 = (id) => {
      setIsModalOpen1(true);
      
      
    };
    const handleOk =() => {
   
      setIsModalOpen(false);
      
      isEdit(true)
    };
    const handleOk1 = async() => {
      await axios.delete(`/api/moive/${moiveItem._id}`).then((res)=>{
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
          title: 'Tên phim',
          dataIndex: 'name',
          key: 'name',
          width: '20%',
          
          ...getColumnSearchProps('name'),
          render: (_, record) => (           
            <div style={{textAlign:"left", fontSize:"20", fontWeight:550,color:"#222"}}
                 > {record.name} </div>
          ),
        },
        {
          title: 'Loại màn hình',
          dataIndex: 'display_technology',
          key: 'display_technology',
          width: '20%',
          
          ...getColumnSearchProps('display_technology'),
          render: (_, record) => (           
            <div style={{textAlign:"left", fontSize:"20", fontWeight:550,color:"#222"}}
                 > {record.display_technology} </div>
          ),
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'images',
            key: 'images',
            width: '10%',
            
            
            render: (_, record) => (
              <Image style={{textAlign:"center"}}
            width={100}
            
            src={record.images[0]}
          />
            ),
          },
        {
          title: 'Ngày khởi chiếu',
          dataIndex: 'premiere_date',
          key: 'premiere_date',
          width: '20%',
          ...getColumnSearchProps('premiere_date'),
          sorter: (a, b) =>{ 
            const timea = new Date(a.premiere_date) 
            const timeb = new Date(b.premiere_date) 
            return timea - timeb},
          sortDirections: ['descend', 'ascend'],
       
        },
        
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              
            <Button type="primary" onClick={(e)=>{
                e.preventDefault();
                setMoiveItem(record)
                showModal()
            }}  className="navbar-register" >
            Xem chi tiết </Button>
            <Button type="primary" onClick={(e)=>{
                e.preventDefault();    
                setMoiveItem(record)            
                showModal1()
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
  
  dataSource={allmoives}  />;


    <Modal width={1000} title="Chi tiết phim" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <MoiveShow edit={edit} load={load} setLoad ={setLoad} isEdit={isEdit} moiveItem={moiveItem}></MoiveShow>
      </Modal> 

     <Modal width={1000} title="Bạn có muốn xóa phim này ra khỏi danh sách chiếu" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
       
     </Modal>   
    </>  );
}
 
export default Content_pageMoive;