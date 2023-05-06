import "./ticket-booking.css";

import { Checkbox, Col, Row } from "antd";

const Form_Check = (props) => {
  const {allMoives,setCheckMoives} =props;
  // console.log(allMoives)
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
    setCheckMoives(checkedValues.join(" "))
  };
  
  return (
    <>
     
            <div className="form_check">
              <Checkbox.Group
                style={{
                  width: "100%",
                  display: "inline",
                }}
                onChange={onChange}
              >
                
                <div className="checkbook"> 
                {allMoives.map((item,index)=>{
                  return (
                    <>
                    <Checkbox value={item._id} key={index}>  {item.name} </Checkbox>
                    <br></br>
                    </>
                  )
                })}
                 
                  </div>
                  


               
              </Checkbox.Group>
           </div>
    </>
  );
};

export default Form_Check;
