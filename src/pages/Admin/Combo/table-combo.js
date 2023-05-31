import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Image, message, Modal } from "antd";
import React, { useRef, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TimelineItem from "antd/es/timeline/TimelineItem";
import EditCombo from "./edit-combo";

const Table_combo = (props) => {
  const {  load, setLoad, combo } = props;
//   console.log("combo", combo);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [comboChon,setCombo] = useState({});
   
 


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
      title: "Tên combo",
      dataIndex: "name",

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
      title: "Hình ảnh:",
      dataIndex: "images",
      key: "images",
      width: "20%",
    
    
    render: (_,record)=>(
        <>
          <img src={record.images}></img>
        </>
    )
},
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      width: "20%",

      ...getColumnSearchProps("price"),
      render: (_, record) => (
        <div>
         <p>{record.price/1000}.000 VND</p>
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "20%",

      ...getColumnSearchProps('number'),
    
    },
   
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
         
             <Button
            type="primary"
            onClick={(e)=>{
                    e.preventDefault();   
                    setCombo(record)            
                    showModal() }
            }
            danger
            className="navbar-register"  > Sửa </Button>
         

          
              <Button
            type="primary" danger
            onClick={(e) => {
                e.preventDefault();   
                // setDiscount(record)            
                showModal1()
            }}
            className="navbar-register"
          > Xóa    </Button>

            
        </Space>
      ),
    },
  ];
 //// edit Modal 
 const showModal = () => {
    setIsModalOpen(true);
    
  };   
    

 const handleOk =() => {
     
    setIsModalOpen(false);
    
   
  };
  const handleCancel = () => {
    setIsModalOpen(false);
   
  };


  const showModal1 = () => {
    setIsModalOpen1(true);
    
  };   

  const handleOk1 =async () => {
        
    // await axios.delete(`/api/discount/delete/${discount._id}`).then((res)=>{
    //     console.log(res.data)
    //    if(res.data.success){
    //     message.success("Xóa thành công")
    //    }
    //    if(!res.data.success){
    //     message.error("Xóa thất bại")
    //    }
        
               
    //   }).catch(()=>{
    //     message.error("Xóa thất bại")
    //   })
    //   setLoad(!load)
    setIsModalOpen1(false);
    
    
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
   
  };
 useEffect(()=>{
    console.log("loading...");
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
        dataSource={combo}
      />
        <Modal width={1000} title="Chỉnh sửa combo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <EditCombo comboChon={comboChon} load={load} setLoad={setLoad}></EditCombo>
      </Modal> 

     <Modal width={1000} title="Bạn có muốn xóa mã này ra khỏi danh sách chiếu" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
        
     </Modal>  
      
    </>
  );
};

export default Table_combo;
