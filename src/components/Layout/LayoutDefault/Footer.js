import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import Map from './Map';
export default function App() {
    const key ="AIzaSyBRNmmbPd4Xdl1svuvYg84m75mSMo5vEyY"
    const initMap =()=>{
      
    }
  return (
    <MDBFooter bgColor='light' className=' '>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
        
        </div>

        <div>
          <a href='' className='me-4 '>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 '>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 '>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 '>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 '>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 '>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="4" className='mx-auto mb-4'>
              <h6 style={{textAlign:"center"}} className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Phòng chiếu phim CSV
              </h6>
              
              <Map
     
     googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
     loadingElement={<div style={{width:"240px", height: `100%` }} />}
     containerElement={<div style={{ width:"240px", height: `50vh`, margin: `auto`, border: '2px solid black' }} />}
     mapElement={<div style={{ width:"240px", height: `100%` }} />}
     >


     </Map>
            </MDBCol>

            <MDBCol md="2" lg="3" xl="3" className='mx-auto mb-5'>
              <h6   className='text-uppercase fw-bold mb-5'>Điều khoản sử dụng </h6>
              <p>
                <a href='#!'  className='text-reset'>
                 Điều khoản chung
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Điều khoản giao dịch
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Chính sách bảo mật
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                 Câu hỏi thường gặp
                </a>
              </p>
            </MDBCol>

            {/* <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6  className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol> */}

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6  className='text-uppercase fw-bold mb-4'>Kế nối với chúng tôi</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                 337 Trần Cung, Bắc Từ Niêm, Hà Nội
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                CSV-Vietnam@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

     
    </MDBFooter>
  );
}