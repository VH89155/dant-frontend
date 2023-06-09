
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table,Image,message,Modal } from 'antd';
import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from "axios";



const ShowTimeSuccess = () => {

    const [load,setLoad] = useState(false)
    const[showTime, setShowTime] = useState([])
    const showTimeReal = showTime?.map(item =>{
        const time = new Date(item.time)
        
        return{
            _id: item._id,
            time: item.time,
            success: item.success,
            nameMoive: item?.moive?.name,

            timeReal :time,
        }
    })
    console.log(showTimeReal)

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
      title: "Tên phim",
      dataIndex: "nameMoive",

      width: "20%",

      ...getColumnSearchProps("nameMoive"),
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
          {record?.nameMoive}{" "}
        </div>
      ),
    },
    {
      title: "Thời gian chiếu :",
      dataIndex: "time",
      key: "time",
      width: "20%",
      ...getColumnSearchProps("time"),
      sorter: (a, b) => {
        const timea = new Date(a?.time);
        const timeb = new Date(b?.time);
        return timea.getTime() - timeb.getTime();
      },
      sortDirections: ["descend", "ascend"],
    
    render: (_,record)=>(
        <>
            <p>Thời gian: {record.timeReal.getHours() > 9
        ? record.timeReal.getHours()
        : `0${record.timeReal.getHours()}`}
      :
     {record.timeReal.getMinutes() > 9
        ? record.timeReal.getMinutes()
        : `${record.timeReal.getMinutes()}0`} </p>
      
            <p> Ngày: {record.timeReal.getDate()}-{record.timeReal.getMonth() + 1}-{record.timeReal.getFullYear()}</p>
        </>
    )
    },
   

    {
      title: "Trạng thái",
      key: "Trạng thái",
      width: "20%",
      render: (_, record) => (
            <p style={{width:"100px", textAlign:" center", padding:10, color:"white", backgroundColor:"green"}}>
                    Hoàn thành

            </p>
            
          
      )
    },
  ];



    useEffect(()=>{
        const fetchData = async()=>{
            await axios.get("https://project-datn.herokuapp.com/api/show-time/show-time/success").then((res)=>{
                setShowTime(res.data)
                console.log(res.data)
            })
        }
        fetchData()
    },[load])
    return (  
    
    <>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        // expandable={{
        //   expandedRowRender: (record) => (
        //     <>
        //      <p
        //         style={{
        //           margin: 0,
        //         }}
        //       >
        //         ID Vé: {record._id}
        //       </p>
        //       <p
        //         style={{
        //           margin: 0,
        //         }}
        //       >
        //         Email người mua: {record.ticket.user.email}
        //       </p>
        //       <p
        //         style={{
        //           margin: 0,
        //         }}
        //       >
        //         Tên người mua: {record.ticket.user.fullName}
        //       </p>
        //       <p
        //         style={{
        //           margin: 0,
        //         }}
        //       >
        //         Số điện thoại người mua: {record.ticket.user.phoneNumber}
        //       </p>
        //     </>
        //   ),
        // //   rowExpandable: (record) => record.name !== "Not Expandable",
        // }}
        dataSource={showTimeReal}
      />
            
    
    </>
    
    );
}
 
export default ShowTimeSuccess;