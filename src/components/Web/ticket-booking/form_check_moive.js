import "./ticket-booking.css";

import { Checkbox, Col, Row } from "antd";

const Form_Check = (props) => {
  const {allMoives,setCheckMoives,moiveID,checkMoives} =props;

  // console.log(allMoives)
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
    setCheckMoives(checkedValues.join(" "))
  };
  const options = allMoives.map((item,index)=>{
    return {
      value :item._id,
      label: item.name,
    }
  })
  return (
    <>
     
            <div className="form_check">
              <Checkbox.Group
                style={{
                  width: "100%",
                  display: "grid",
                  alignItems:"flex-end"
                }}
                options={options}
                onChange={onChange}
                defaultValue={[moiveID]} 
              >
                
                {/* <div className="checkbook"> 
                {allMoives.map((item,index)=>{
                  console.log(checkMoives === item._id)
                  return (
                    <>
                    { checkMoives === item._id ? <>
                      <Checkbox  value={item._id} key={index}>  {item.name} </Checkbox>
                    <br></br>
                    </>:
                    <>
                       <Checkbox  value={item._id} key={index}>  {item.name} </Checkbox>
                    <br></br>
                    </>

                    }
                   
                    </>
                  )
                })}
                 
                  </div> */}
                  


               
              </Checkbox.Group>
           </div>
    </>
  );
};

export default Form_Check;
