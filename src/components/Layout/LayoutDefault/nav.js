import { Avatar } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
    const [menu,isMenu] = useState(false);
    const {auth} = props
    
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    
    console.log(width)
    return (

        <header class="header-area header-sticky">
      <div className="header-home">
      <Link class="logo" to={'/'}>
         <img  class="logo-img"   src="https://res.cloudinary.com/duytmd7ue/image/upload/v1682410851/a_lo_go_hiepo_2_mmcpw1.png"></img>
         
      </Link>
      <div className="right">
       { !auth? ( <>
                <Link to="/register" className="label-dn">Đăng ký</Link>
                <Link to={'/login'} className="label-dn"> Đăng nhập</Link>
                </>
          
              ) : (
                <>
                    <div className="avatar">
                        <img src={auth?.info?.avatar}></img>
                        <Link to="/default/custom-account"><div className="label-avatar">{auth?.info.username}</div></Link>
                    </div>
                    
                </>
              )

       } 
         
       
      </div>
      <div className="hotline">Hotline: <span>0368474925</span></div>
     <img className="banner-qc" src="https://advserver.cgv.vn/www/images/4071dd3a3df0579d220dad28e9c08679.jpg"></img>
   
    </div>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <nav class="main-nav">

             {(menu || width > 990 ) && (
              <ul class="nav">
              <li>
                <a href="/"onClick={ ()=>isMenu(!menu)} >
                  TRANG CHỦ
                </a>
              </li>
              <li>
                <a href="/" onClick={ ()=>isMenu(!menu)}>GIỚI THIỆU</a>
              </li>
              <li>
                <a href="/show-time" onClick={ ()=>isMenu(!menu)}>LỊCH CHIẾU</a>
              </li>
              <li>
                <a href="/news" onClick={ ()=>isMenu(!menu)}>TIN TỨC</a>
              </li>
              <li>
                <a href="/ticket-price" onClick={ ()=>isMenu(!menu)}>GIÁ VÉ</a>
              </li>
              <li className="ticket" onClick={ ()=>isMenu(!menu)}>
                <a href="/ticket-booking">
                <img className="ticket" src=" https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/ticket.png"></img>
               MUA VÉ ONLINE
                </a>
              
              </li>
              {
                 ( !auth && width <992) && (<>
                 <li onClick={ ()=>isMenu(!menu)}> <Link to="/register" >Đăng ký</Link> </li>

                 <li onClick={ ()=>isMenu(!menu)}> <Link to={'/login'} > Đăng nhập</Link></li>
                  </>
                 )}
                 {  ( auth && width <992) && (<>
                  <li onClick={ ()=>isMenu(!menu)}>
                  
                     <Link to="/default/custom-account">    Xin chào: {auth?.info.username}</Link>
                    
                  </li>
                 </>)

                }

             
              {/* <li className="ticket">
                <a href="profile.html">
                  Profile <img src="../images/profile-header.jpg"></img>
                </a>
              </li> */}


            </ul>
             )
               } 
               
                {/* <ul class="nav">
                        <li><a href="index.html" class="active">Home</a></li>
                        <li><a href="browse.html">Browse</a></li>
                        <li><a href="details.html">Details</a></li>
                        <li><a href="streams.html">Streams</a></li>
                        <li><a href="profile.html">Profile</a></li>
                    </ul>  */}
                <a class="menu-trigger" onClick={ ()=>isMenu(!menu)}>
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
      );
}
 
export default Nav;