import "./Layout.css";
import { Layout, Row, Col, Image, Input } from "antd";
import { Link } from "react-router-dom";
import Nav from "./nav";
import { useSelector } from "react-redux";
const { Header, Footer, Sider, Content } = Layout;

const DasBoardPage = ({ children }) => {
 const auth = useSelector((state)=>state.auth?.login?.currentUser)
 console.log(auth)
  return (
     

  <Layout >
    
   
   
    
      <Nav auth ={auth}></Nav>
      
 
      <Content className="content">

      {children}
      </Content>
      
      
      
     
     
<Footer>
      <footer>
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <p>
                Copyright © 2036 <a href="#">Cyborg Gaming</a> Company. All
                rights reserved.
                <br></br>Design:{" "}
                <a
                  href="https://templatemo.com"
                  target="_blank"
                  title="free CSS templates"
                >
                  TemplateMo
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
      </Footer>
      </Layout>
  );
};

export default DasBoardPage;
