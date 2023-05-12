import { Button, Form, Input, Select } from "antd";
import { useEffect,useState } from "react";

const OptionRoom = (props) => {
    const {room,onChangeRoom,romdefault} = props;
   useEffect(() => {


   },[romdefault,room])
    return ( <>
     <Form.Item label="Tên phòng chiếu: ">
          <Select
            defaultValue={{
              value: romdefault ?   romdefault._id: room[0]?.value ,
              name: romdefault ? romdefault._name: room[0]?.name,
            }}
            // onChange={onChangeAge}
            options={room}
            onChange={onChangeRoom}
          />
         
        </Form.Item>
    </> );
}
 
export default OptionRoom;