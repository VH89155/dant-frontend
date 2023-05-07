import "./index.css";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/apiRequest";
const Sidebar = (props) => {
  const { auth, namePage } = props;
  console.log(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Click = () => {
    console.log("hello", auth?.token);
    logOut(dispatch, navigate, auth?.token);
  };
  return (
    <div className="sidebar-left">
      <div className="block-account">
        <div className="block-title">
          <span>TÀI KHOẢN CSV</span>
        </div>
        <div className="block-content">
          <ul>
          {namePage === "default" ? (
             <li className="current">
             <a href="/default/custom-account">THÔNG TIN CHUNG</a>
           </li>
            ) : (
              <li>
                <a href="/default/custom-account">THÔNG TIN CHUNG</a>
              </li>
            )}
            
            {namePage === "editAccount" ? (
              <li className="current">
                <a href="/default/custom-account/edit">CHI TIẾT TÀI KHOẢN</a>
              </li>
            ) : (
              <li>
                <a href="/default/custom-account/edit">CHI TIẾT TÀI KHOẢN</a>
              </li>
            )}
              {namePage === "ticket" ? (
              <li className="current">
                <a href="/default/ticket">VÉ CỦA BẠN</a>
              </li>
            ) : (
              <li>
                <a href="/default/ticket">VÉ CỦA BẠN</a>
              </li>
            )}
            <li>
              <a>KHUYẾN MÃI CỦA BẠN</a>
            </li>
           
            <li>
              <a className="logout" onClick={Click}>
                THOÁT
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
