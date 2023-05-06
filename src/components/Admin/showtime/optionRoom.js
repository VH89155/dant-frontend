import { Button, Form, Input, Select } from "antd";


const OptionRoom = (props) => {
    const {room,onChangeRoom} = props;
   
    return ( <>
     <Form.Item label="Tên phòng chiếu: ">
          <Select
            defaultValue={{
              value: room[0]?.value,
              name: room[0]?.name,
            }}
            // onChange={onChangeAge}
            options={room}
            onChange={onChangeRoom}
          />
         
        </Form.Item>
    </> );
}
 
export default OptionRoom;