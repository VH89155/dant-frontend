import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Image, message, Modal } from "antd";
import React, { useRef, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TimelineItem from "antd/es/timeline/TimelineItem";

const Table_ticket = (props) => {
  const { tickets, load, setLoad, value,spin, setSpin } = props;
  console.log("tickets", tickets);
  const ticketReal = tickets.map((item) => {
    const time = new Date(item.showTime.time);

    return {
      ...item,
      nameMoive: item.showTime.moive.name,
      time: time,
    };
  });
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
          {record.nameMoive}{" "}
        </div>
      ),
    },
    {
      title: "Thời gian chiếu :",
      dataIndex: "showtime",
      key: "showtime",
      width: "20%",
      ...getColumnSearchProps("showtime"),
      sorter: (a, b) => {
        const timea = new Date(a.showTime.time);
        const timeb = new Date(b.showTime.time);
        return timea.getTime() - timeb.getTime();
      },
      sortDirections: ["descend", "ascend"],
    
    render: (_,record)=>(
        <>
            <p>Thời gian: {record.time.getHours() > 9
        ? record.time.getHours()
        : `0${record.time.getHours()}`}
      :
     {record.time.getMinutes() > 9
        ? record.time.getMinutes()
        : `${record.time.getMinutes()}0`} </p>
      
            <p> Ngày: {record.time.getDate()}-{record.time.getMonth() + 1}-{record.time.getFullYear()}</p>
        </>
    )
},
    {
      title: "Ghế chọn",
      dataIndex: "number",
      key: "number",
      width: "20%",

      ...getColumnSearchProps("number"),
      render: (_, record) => (
        <div>
          {record.number?.map((item, index) => {
            if (index === record.number.length - 1) return `${item}. `;
            else if (index !== record.number.length - 1) return `${item}, `;
          })}{" "}
        </div>
      ),
    },
    {
      title: "Combo đi kèm",
      dataIndex: "combo",
      key: "combo",
      width: "20%",

      // ...getColumnSearchProps('number'),
      render: (_, record) => (
        <p>
          {record.combo?.map((item, index) => {
            return (
              <p>
                {" "}
                Tên Combo : {item.name} <p> SL: {item.value}</p>{" "}
              </p>
            );
          })}{" "}
        </p>
      ),
    },
    {
      title: "Tổng số tiền",
      dataIndex: "price",
      key: "price",
      width: "20%",

      ...getColumnSearchProps("price"),
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
          {record.price / 1000}.000 VND{" "}
        </div>
      ),
    },

    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
         
            {value === "0" &&  
             <Button
            type="primary"
            onClick={async()=>{
              setSpin(true)
               await axios.put(`/api/ticket/ticket-accuracy/${record.tiketID}`).then((res)=>{
                  if(res.data.success){
                    message.success("Xác nhận thành công")
                    setLoad(!load)
                  
                  }
                  else if(!res.data.success) message.error("Xác nhận không thành công")
               }).catch((err)=>{
                message.error(`Xác nhận không thành công:  ${err}`)
               })   
               setSpin(false)
            }}
            className="navbar-register"
          > Xác nhận   </Button>}

            {value === "1" && 
              <Button
            type="primary" danger
            onClick={(e) => {}}
            className="navbar-register"
          > Huỷ     </Button>}

            {value === "2" &&  <Button
            type="primary"
            onClick={(e) => {}}
            className="navbar-register"
          > Xác nhận   </Button>}
            {/* {value=== "3" && "Xác nhận"}  */}
       
          {/* <Button type="primary" onClick={(e)=>{
               
            }} danger >Xóa</Button> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey={(record) => record.tiketID}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <>
             <p
                style={{
                  margin: 0,
                }}
              >
                ID Vé: {record.tiketID}
              </p>
              <p
                style={{
                  margin: 0,
                }}
              >
                Email người mua: {record.user.email}
              </p>
              <p
                style={{
                  margin: 0,
                }}
              >
                Tên người mua: {record.user.fullName}
              </p>
              <p
                style={{
                  margin: 0,
                }}
              >
                Số điện thoại người mua: {record.user.phoneNumber}
              </p>
            </>
          ),
        //   rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={ticketReal}
      />
      
    </>
  );
};

export default Table_ticket;
