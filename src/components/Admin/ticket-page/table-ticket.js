import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Image, message, Modal } from "antd";
import React, { useRef, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import axios from "axios";
import TimelineItem from "antd/es/timeline/TimelineItem";
import CommontUtils from "../../../utils/CommonUtils";


const Table_ticket = (props) => {
  const componentRef = useRef()
  const { bills, load, setLoad, value,spin, setSpin } = props;
  console.log("bills", bills);
 let  billReal = bills.map((item) => {
    const time = new Date(item?.ticket.showTime.time);

    return {
      ...item,
      room: item?.ticket?.showTime.room.name,
      nameMoive: item?.ticket.showTime.moive.name,
      time: time,
      number: item?.ticket.number
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
      // ...getColumnSearchProps("showtime"),
      sorter: (a, b) => {
        const timea = new Date(a?.ticket.showTime.time);
        const timeb = new Date(b?.ticket.showTime.time);
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
  title: "Phòng chiếu",
  dataIndex: "room",
  key: "room",
  width: "10%",

  ...getColumnSearchProps("room"),
  render: (_, record) => (
    <div>
      {record.room}
    </div>
  ),
},
    {
      title: "Ghế chọn",
      dataIndex: "number",
      key: "number",
      width: "10%",

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
               await axios.put(`/api/ticket/ticket-accuracy/${record._id}`).then((res)=>{
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

            {value === "1" && <>
              <Button
            type="primary" danger
            onClick={(e) => {}}
            className="navbar-register"
          > Huỷ     </Button>
          <ReactToPrint 
            trigger={()=>{
              return  <Button
              type="primary"
              
            > In vé     </Button>
            }}
            documentTitle="Vé"
            pageStyle="print"
            onAfterPrint={()=>{
              console.log('Ve in')
            }}
            content={()=>componentRef.current}
            
          />
          


         
          </>
          }





            {value === "2" &&  <Button
            type="primary"
            onClick={(e) => {}}
            className="navbar-register"
          > Xác nhận   </Button>}
           {value === "4" &&  <>
            <div> <p style={{textAlign:"center", width:"100%",padding:"10", backgroundColor:"green", color:"#fff"}}>Hoàn thành</p></div>
           </>}
            {/* {value=== "3" && "Xác nhận"}  */}
       
          {/* <Button type="primary" onClick={(e)=>{
               
            }} danger >Xóa</Button> */}
        </Space>
      ),
    },
  ];
  const handleClickExport = async()=>{
    const data = billReal.map(item=>{
      const ghe = item.ticket.number.reduce((number, item)=> number + `${item},` ,"")
      const combo = item.combo?.reduce((combo,item)=>{
        return combo + `${item.name} : ${item.value}, `
      },"")
   
      return{
        ID_VE: item._id,
        Ten_Phim : item.ticket.showTime.moive.name,
        So_ghe: ghe ,
        ThoiGianChieu: `${item.time.getHours()}: ${item.time.getMinutes()}`,
        NgayChieu: `${item.time.getDate()}/ ${item.time.getMonth()+1}/${item.time.getFullYear()}`,
        Phong_Chieu: item.ticket.showTime.room.name,
         combo: combo,
        Tong_Tien: item.price,
        email_Khach: item.ticket.user.email,
        

        
      }
    })
    await CommontUtils.exportExcel(data,"Danh sach ve","DSVe")
  }
  return (
    <>
    <Button type="primary" onClick={handleClickExport} >Export Excel</Button>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            
            <div ref={componentRef} className="description" style={{display:"flex"}}>
              <div style={{marginRight:100}}>
                <h4>Thông tin Vé:</h4>
                <p>Tên phim: <span> {record.nameMoive}</span></p>
                <p>Thời gian chiếu: <span> {record.time.getHours() > 9
        ? record.time.getHours()
        : `0${record.time.getHours()}`}
      :
     {record.time.getMinutes() > 9
        ? record.time.getMinutes()
        : `${record.time.getMinutes()}0`}</span></p>
              <p>Ngày chiếu: <span>  {record.time.getDate()}-{record.time.getMonth() + 1}-{record.time.getFullYear()}</span> </p>
          <p>Phòng chiếu: <span>  {record.room}</span></p>
          <p>Ghế : <span>  {record.number?.map((item, index) => {
            if (index === record.number.length - 1) return `${item}. `;
            else if (index !== record.number.length - 1) return `${item}, `;
          })}</span></p>
         <p>
          {record.combo?.map((item, index) => {
            return (
              <p>
                {" "}
                Combo đi kèm : {item.name} <p> SL: {item.value}</p>{" "}
              </p>
            );
          })}{" "}
        </p>
          <p  style={{
            textAlign: "left",
            fontSize: "20",
            fontWeight: 550,
            color: "#222",
          }}>Tổng số tiền: <span> {record.price / 1000}.000 VND</span> </p>

        <p style={{
            textAlign: "left",
            fontSize: "20",
            fontWeight: 550,
            color: "#222",
            marginTop:"50px"
          }}>Phòng chiếu phim CSV </p>
                <p>Địa chỉ: <span>477 Phạm Văn Đồng</span></p>
                <p>Số điện thoại: <span>099898989</span></p>
              </div>

              <div style={{marginTop:28}}>

              <p
                style={{
                  margin: 0,
                }}
              >
                ID Vé: {record._id}
              </p>
              <p
                style={{
                  margin: 0,
                }}
              >
                Email người mua: {record?.ticket.user.email}
              </p>
              <p
                style={{
                  margin: 0,
                }}
              >
                Tên người mua: {record?.ticket.user.fullName}
              </p>
              <p
                style={{
                  margin: 0,
                }}
              >
                Số điện thoại người mua: {record?.ticket.user.phoneNumber}
              </p>
              <img src={record.ticket.maQR} style={{width: '46%'}}></img>
             
              </div>
              
            </div>
          ),
        //   rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={billReal}
      />
      
    </>
  );
};

export default Table_ticket;
