import "./style.css"
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Image, message, Modal } from "antd";
import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import Edit_Discount from "./edit_discount";



const Table_discount = (props) => {
    const { discounts, load, setLoad } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [discount,setDiscount] = useState({});
   

    const discountEdit = discounts.map((item)=>
    {
        const timeStart = new Date(item.start_time);
        const timeEnd = new Date(item.end_time);
        
        
        return{
            ...item,
            timeStart,
            timeEnd
        }
    })

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
          title: "Mã code",
          dataIndex: "name",
          key:"name",  
          width: "10%",
    
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
          title: "Thời gian bắt đầu :",
          dataIndex: "start_time",
          key: "start_time",
          width: "20%",
         
          sorter: (a, b) => {
            const timea = new Date(a.start_time);
            const timeb = new Date(b.start_time);
            return timea.getTime() - timeb.getTime();
          },
          sortDirections: ["descend", "ascend"],
        
        render: (_,record)=>(
            <>
                
            <p> Ngày: {record.timeStart.getDate()}-{record.timeStart.getMonth() + 1}-{record.timeStart.getFullYear()}</p>
            </>
        )
    },
    {
        title: "Thời gian kết thúc :",
        dataIndex: "end_time",
        key: "end_time",
        width: "20%",
       
        sorter: (a, b) => {
          const timea = new Date(a.end_time);
          const timeb = new Date(b.end_time);
          return timea.getTime() - timeb.getTime();
        },
        sortDirections: ["descend", "ascend"],
      
      render: (_,record)=>(
          <>
              
          <p> Ngày: {record.timeEnd.getDate()}-{record.timeEnd.getMonth() + 1}-{record.timeEnd.getFullYear()}</p>
          </>
      )
  },
    
        {
          title: "Giá trị mã giảm giá",
          dataIndex: "discount_value",
          key: "discount_value",
          width: "10%",
    
          ...getColumnSearchProps("discount_value"),
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
              {record.discount_value}{" "}
            </div>
          ),
          
        },
        {
            title: "Số lượng mã",
            dataIndex: "quantity",
            key: "quantity",
            width: "10%",
      
            ...getColumnSearchProps("quantity"),
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
                {record.quantity}{" "}
              </div>
            ),
            
          },
        {
          title: "Số tiền tối thiểu",
          dataIndex: "minimum_price",
          key: "minimum_price",
          width: "10%",
    
          ...getColumnSearchProps("minimum_price"),
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

             {record.minimum_price ? `${record.minimum_price / 1000}.000 VND` : "Không"}
            </div>
          ),
        },
        {
            title: "Số vé tối thiểu",
            dataIndex: "minimum_quantity",
            key: "minimum_quantity",
            width: "10%",
      
            ...getColumnSearchProps("minimum_quantity"),
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
  
               {record.minimum_quantity ? `${record.minimum_quantity / 1000}.000 VND` : "Không"}
              </div>
            ),
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
                    e.preventDefault();   
                    // setDiscount(record)            
                    showModal1() }}
              > Xóa   </Button>

              
                 <Button
                type="primary"
                danger
                className="navbar-register"
                onClick={(e)=>{
                    e.preventDefault();   
                    setDiscount(record)            
                    showModal() }} >
              Sửa   </Button>
    
               
            </Space>
          ),
        },
      ];
    

      /////////// show Modal ----------------------------------
     
      const showModal = () => {
        setIsModalOpen(true);
        
      };   
        
      
      const handleOk =() => {
     
        setIsModalOpen(false);
        
        setLoad(!load)
      };
      const handleCancel = () => {
        setIsModalOpen(false);
        setLoad(!load)
       
      };


      const showModal1 = () => {
        setIsModalOpen1(true);
        
      };   
        
      
      const handleOk1 =async () => {
        
        await axios.delete(`/api/discount/delete/${discount._id}`).then((res)=>{
            console.log(res.data)
           if(res.data.success){
            message.success("Xóa thành công")
           }
           if(!res.data.success){
            message.error("Xóa thất bại")
           }
            
                   
          }).catch(()=>{
            message.error("Xóa thất bại")
          })
          setLoad(!load)
        setIsModalOpen1(false);
        
        
      };
      const handleCancel1 = () => {
        setIsModalOpen1(false);
       
      };


  //  useEffect(()=>{

  //  },[discount])

    return ( <>
        <Table
        rowKey={(record) => record._id}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <>
            
              <p>{record.description}</p>
            </>
          ),
        //   rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={discountEdit}
      />
      <Modal width={1000} title="Chỉnh sửa mã giảm giá" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Edit_Discount   discount={discount} ></Edit_Discount>
      </Modal> 

     <Modal width={1000} title="Bạn có muốn xóa mã này ra khỏi danh sách chiếu" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
       
     </Modal>  
    </> );
}
 
export default Table_discount;