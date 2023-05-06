import "./index.css";
import { Button, Upload } from "antd";
import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import cloudinaryUpload from "../../../service/upload";
import axios from "axios";
import { getProfile } from "../../../redux/apiRequest";
import { useDispatch } from "react-redux";

const Main_default = (props) => {
  let { auth, setLoad, load } = props;

  const dispatch = useDispatch();

  const fileList = [
    {
      uid: "-1",
      //   name: 'image.png',
      status: "done",
      url: auth?.currentUser?.info.avatar,
    },
  ];

  const onChange = async ({ fileList: newFileList, file }) => {
    console.log(fileList, file);
    const uploadData = new FormData();
    uploadData.append("file", file.originFileObj, "file");
    const avatar = await cloudinaryUpload(uploadData);
    await axios
      .post("http://localhost:8080/api/auth/edit-avatar", {
        avatar: avatar,
        id: auth?.currentUser?.info._id,
      })
      .then((res) => {
        console.log(res.data);
        setLoad(!load);
      })
      .catch((err) => console.log(err));
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  console.log(auth);

  useEffect(() => {
    getProfile(dispatch, auth?.token);
  }, [load]);

  return (
    <>
      <div className="main-default_acc">
        <div className="my_account">
          <div className="page-title-df-acc">
            <h3>THÔNG TIN CHUNG</h3>
          </div>
          <div className="my_profile">
            <div className="image-profile">
              {/* <img src={auth?.info.avatar}></img>
              <form style={{ position: "absolute" }}>
                <button
                  type="file"
                  className="btn chose-avatar"
                  onClick={editAvatar}
                >
                  Thay đổi
                </button>
              </form> */}
              <ImgCrop style={{marginRight:10000000}} rotationSlider>
                <Upload
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  maxCount={1}
                >
                  {fileList.length < 5 && "+ Thay đổi"}
                </Upload>
              </ImgCrop>
            </div>

            <div className="info-profile">
              <div className="box-title">
                <span>LIÊN HỆ</span>
                <a>Thay đổi</a>
              </div>
              <div className="box-content">
                <span>Email : {auth?.currentUser?.info.email} </span>

                <span>Tên tài khoản : {auth?.currentUser?.info.username} </span>
                <span>Họ và tên : Nguyen Hiep </span>
                <span>Số điện thoại : 0368474925</span>
              </div>
            </div>
          </div>
          <div className="welcome-msg">
            <p className="hello">Xin chào Nguyễn Hiệp</p>
            <p>
              Với trang này, bạn sẽ quản lý được tất cả thông tin tài khoản của
              mình.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main_default;
