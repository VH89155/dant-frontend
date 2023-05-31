
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Image, message, Modal } from "antd";
import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";




const Table_room = (props) => {
    const { rooms, load, setLoad,setStatus,setName, setEdit,  setId,setCategory } = props;
   
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
          title: "Tên phòng chiếu",
          dataIndex: "name",
          key:"name",  
          width: "20%",
    
          ...getColumnSearchProps("name"),
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
              {record.name}{" "}
            </div>
          ),
        },
        {
          title: "Loại màn hình chiếu :",
          dataIndex: "category",
          key: "category",
          width: "20%",
         
         
        
        render: (_,record)=>(
            <div
              style={{
                textAlign: "left",
                fontSize: "20",
                fontWeight: 550,
                color: "#222",
              }}
            >
              {" "}
              {record.category}{" "}
            </div>
        )
    },
    {
        title: "Trạng thái phòng :",
        dataIndex: "end_time",
        key: "end_time",
        width: "20%",
       
      
      
      render: (_,record)=>(
          <>
          {record.status ? (<>
          <Button type="dashed"  >Hoạt động</Button>
          </>):

          (<>
            <Button type="primary" danger > Không hoạt động</Button> 
          </>)

          }
              
          <p></p>
          </>
      )
  },
    
        {
          title: "Hành động",
          key: "action",
          width: "10%",
          render: (_, record) => (
            <Space size="middle">
             
              
                 <Button
                type="primary"
                danger
                className="navbar-register"
                onClick={(e)=>{
                     }}
              > Xóa   </Button>

              
                 <Button
                type="primary"
                danger
                className="navbar-register"
                onClick={(e)=>{
                    e.preventDefault();
                    setCategory(record.category)
                    setName(record.name)
                    setStatus(record.status)
                    setId(record._id)
                    setEdit(true)
                     }} >
              Sửa   </Button>
    
               
            </Space>
          ),
        },
      ];
    

      /////////// show Modal ----------------------------------
  
  //  },[discount])

    return ( <>
        <Table
        rowKey={(record) => record._id}
        columns={columns}
      
        dataSource={rooms}
      />
     
    </> );
}
 
export default Table_room;