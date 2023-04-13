import "./DashBoardPage.css";
import { Layout, Row, Col, Image, Input } from "antd";
import { Link } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;

const DasBoardPage = ({ children }) => {
  
  return (
    

  <Layout >
    
   
   <Header>
    
      <header class="header-area header-sticky">
      <div className="header-home">
      <div className="right">
        <span>Đăng ký</span>
        <span>Đăng nhập</span>
      </div>
      <div className="hotline">Hotline: <span>0368474925</span></div>
    </div>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <nav class="main-nav">
                <Link class="logo" to={'/'}>
                  <img src="../images/logo.png"></img>
                  </Link>

                {/* <div class="search-input">
                  <form id="search" action="#">
                    <input
                      type="text"
                      placeholder="Type Something"
                      id="searchText"
                      name="searchKeyword"
                      onkeypress="handle"
                    />
                    <i class="fa fa-search"></i>
                  </form>
                </div> */}

                <ul class="nav">
                  <li>
                    <a href="/" >
                      TRANG CHỦ
                    </a>
                  </li>
                  <li>
                    <a href="browse.html">GIỚI THIỆU</a>
                  </li>
                  <li>
                    <a href="/show-time">LỊCH CHIẾU</a>
                  </li>
                  <li>
                    <a href="/news">TIN TỨC</a>
                  </li>
                  <li>
                    <a href="/ticket-price">GIÁ VÉ</a>
                  </li>
                  <li className="ticket">
                    <a href="/ticket-booking">
                    <img className="ticket" src=" https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/ticket.png"></img>
                   MUA VÉ ONLINE
                    </a>
                  </li>

                 
                  {/* <li className="ticket">
                    <a href="profile.html">
                      Profile <img src="../images/profile-header.jpg"></img>
                    </a>
                  </li> */}


                </ul>
                <a class="menu-trigger">
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
      </Header>
 
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
