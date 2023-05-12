import "./index.css"

const User_Detail = (props) => {
    const { user , load, setLoad } = props;
    console.log(user);
    return ( 

        <>
        <div className="user-show">
            <div className="top">
                <img src={user.avatar} ></img>
                <div className="profile">
                <p> <span>Địa chỉ email:  </span>  {user.email} </p>
                <p> <span>Tên tài khoản:  </span> {user.username} </p>
                <p><span>Họ và tên:  </span> {user.fullName} </p>
                <p><span>Số điện thoại: </span> {user.phoneNumber} </p>
                <p><span>Địa chỉ: </span> {user.address} </p>
                    
                </div>
               
              


            </div>

            <div className="bottom"></div>

        </div>
        </>
     );
}
 
export default User_Detail;