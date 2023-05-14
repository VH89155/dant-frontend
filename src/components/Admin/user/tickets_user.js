import { Link   } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table,Image,message,Modal } from 'antd';
import React, { useRef, useState, useEffect, useContext } from 'react';


const Ticket_User = (props) => {
     const {tickets} = props;
     console.log(tickets);
    
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
          title: 'ID Tickets',
          dataIndex: 'ticketID',
          key: 'ticketID',
          width: '20%',
          
          ...getColumnSearchProps('ticketID'),
          render: (_, record) => (           
            <div style={{textAlign:"left", fontSize:"20", fontWeight:550,color:"#222"}}
                 > {record.tiketID} </div>
          ),
        },
        {
            title: 'Tên phim',
            // dataIndex: 'number',
            key: 'name_moive',
            width: '25%',
            
            // ...getColumnSearchProps('number'),
            render: (_, record) => (
                <div>{record.showTime.moive.name} </div>
                ),
          },


        {
            title: 'Ghế chọn',
            dataIndex: 'number',
            key: 'number',
            width: '15%',
            
            ...getColumnSearchProps('number'),
            render: (_, record) => (
                <div>{record.number?.map((item,index)=>{
                    if(index === record.number.length -1)
                    return `${item}. `
                    else if(index !== record.number.length -1)
                    return `${item}, `
                } )} </div>
                ),
          },
          {
            title: 'Combo đi kèm',
            dataIndex: 'combo',
            key: 'combo',
            width: '20%',
            
            // ...getColumnSearchProps('number'),
            render: (_, record) => (
                <p>{record.combo?.map((item,index)=>{
                    return  `Tên: ${item.name}, SL: ${item.value}\n `
                } )} </p>
                ),
          },
          {
            title: 'Tổng số tiền',
            dataIndex: 'price',
            key: 'price',
            width: '20%',
            
            ...getColumnSearchProps('price'),
            render: (_, record) => (           
              <div style={{textAlign:"left", fontSize:"20", fontWeight:550,color:"#222"}}
                   > {record.price/1000}.000 VND </div>
            ),
          },
      
        
        // {
        //   title: 'Action',
        //   key: 'action',
        //   render: (_, record) => (
        //     <Space size="middle">
              
        //     <Button type="primary" onClick={(e)=>{
               
        //     }}  className="navbar-register" >
        //     Khôi phục </Button>
        //     <Button type="primary" onClick={(e)=>{
               
        //     }} danger >Xóa</Button>
        //     </Space>
        //   ),
        // },
      ];


    return ( <>
     <h3 style={{textAlign:"center", margin:20}}>Vé đã mua </h3>
         <Table

 rowKey={record => record.tiketID}
  columns={columns}
  expandable={{
   expandedRowRender: (record) => (    
     <>
     <p
       style={{
         marginLeft: 50,
         fontSize:16,
         fontWeight:500
       }}
     >
      Lịch chiếu:  {`${new Date(record.showTime.time).getDate()}-${new Date(record.showTime.time).getMonth()+1}-${new Date(record.showTime.time).getFullYear()} ` }
       <span  style={{
         marginLeft: 50,
        
       }}>Thời gian:  {`${new Date(record.showTime.time).getHours()}:${new Date(record.showTime.time).getMinutes()} ` }</span>
     <span  style={{
         marginLeft: 50,
        
       }}>Phòng chiếu:  {record.showTime.room.name}</span>
         <span  style={{
         marginLeft: 50,
        
       }}>Hình thức thanh toán:  {record.payment}</span>
     </p>
     <p
       style={{
        margin: 0,
        fontSize:16,
        fontWeight:500
      }}
     >
     
     </p>
       
     </>
     
   ),
//    rowExpandable: (record) => record.tiketID !== 'Not Expandable',
 }}
  
  dataSource={tickets}  />
    </> );
}
 
export default Ticket_User;