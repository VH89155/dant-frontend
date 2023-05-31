import "./Layout.css";
import { Layout, Row, Col, Image, Input } from "antd";
import { Link } from "react-router-dom";
import Nav from "./nav";
import { useSelector } from "react-redux";
import Map from "./Map";
import { useEffect } from "react";
import Footer_layout from "./Footer";
const { Header, Footer, Sider, Content } = Layout;


const DasBoardPage = ({ children }) => {
  const key ="AIzaSyBRNmmbPd4Xdl1svuvYg84m75mSMo5vEyY"
 const auth = useSelector((state)=>state.auth?.login?.currentUser)
 console.log(auth)
 const scrollToTop = () => {
  window.scrollTo(0, 0);
};
scrollToTop()
  return (
     

  <Layout >
    
   
   
    
      <Nav auth ={auth}></Nav>
      
 
      <Content className="content">

      {children}
      </Content>
      
      
      
    
<Footer>
      
       
          <Footer_layout>

            
          </Footer_layout>
      
      </Footer>
      </Layout>
  );
};

export default DasBoardPage;
