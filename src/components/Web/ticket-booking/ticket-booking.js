import "./ticket-booking.css";

import { Checkbox, Col, Row } from "antd";

const Ticket_Booking = () => {
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  const time = new Date()
  console.log("time: Thứ ", (time.getDay() + 1)+ ", " + time.getDate() +  "-" + (time.getMonth()+1), "-",time.getFullYear() )
  console.log("time: " + time)
  return (
    <>
      <div className="container">
        <div className="page-title">
          <div class="title"> 1. CHỌN PHIM</div>
          <img src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/img48.png"></img>
        </div>
        <div className="content-booking">
          <div className="check-mov">
            <div className="right_title"> CHỌN PHIM</div>
            <div className="form_check">
              <Checkbox.Group
                style={{
                  width: "100%",
                }}
                onChange={onChange}
              >
                
                <div className="checkbook"> 
                  <Checkbox value="A">  Khắc tinh của quỷ </Checkbox>
                  </div>
                  <div className="checkbook"> 
                  <Checkbox value="A">  Khắc tinh của quỷ</Checkbox>
                  </div>
                  <div className="checkbook"> 
                  <Checkbox value="A">  Khắc tinh của quỷ</Checkbox>
                  </div>
                  <div className="checkbook"> 
                  <Checkbox value="A">  Khắc tinh của quỷ</Checkbox>
                  </div>
                  <div className="checkbook"> 
                  <Checkbox value="A">  Khắc tinh của quỷ</Checkbox>
                  </div>
                  <div className="checkbook"> 
                  <Checkbox value="A">  Khắc tinh của quỷ</Checkbox>
                  </div>
                  <div className="checkbook"> 
                  <Checkbox value="A">  Khắc tinh của quỷ</Checkbox>
                  </div>
                  <div className="checkbook"> 
                  <Checkbox value="A">  Khắc tinh của quỷ</Checkbox>
                  </div>
                  <div className="checkbook"> 
                  <Checkbox value="A">  Khắc tinh của quỷ</Checkbox>
                  </div>
                  <div className="checkbook"> 
                  <Checkbox value="A">  Khắc tinh của quỷ</Checkbox>
                  </div>
                  <div className="checkbook"> 
                  <Checkbox value="A">  Khắc tinh của quỷ</Checkbox>
                  </div>
                  <div className="checkbook"> 
                  <Checkbox value="A">  Khắc tinh của quỷ</Checkbox>
                  </div>
                  <div className="checkbook"> 
                  <Checkbox value="A">  Khắc tinh của quỷ</Checkbox>
                  </div>
                  <div className="checkbook"> 
                  <Checkbox value="A">  Khắc tinh của quỷ</Checkbox>
                  </div>



               
              </Checkbox.Group>
            </div>
          </div>
          <div className="booking-time">
            
          <div className="right_title">RẠP CHIẾU PHIM CSV</div>
           <div></div>     
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket_Booking;
