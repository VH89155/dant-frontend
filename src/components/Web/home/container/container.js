import { Link } from "react-router-dom";
import "./container.css";

const Container = () => {
  return (
    <>
      <div class="most-popular">
        <div class="row ">
          <div class="col col-lg-12">
            <div class="heading-section">
              <h4 className="active">
                <em>PHIM ĐANG CHIẾU</em>{" "}
              </h4>
              <h4> PHIM SẮP CHIẾU</h4>
            </div>
            <div class="row scroll">
              <div class="col-lg-3 col-sm-6">
                <div class="item">
                  <img
                    src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
                    alt=""
                  ></img>
                  <p>18+</p>
                  <div class="item_movie">
                    <div class="item_movie--name">Fortnite</div>
                    <div class="item_movie--category">Giật gân, hành động</div>
                    <div class="item_movie--category">Khởi chiếu: 09/4/2023</div>
                  </div>
                  {/* <ul>
                        <li><i class="fa fa-star"></i> 4.8</li>
                        <li><i class="fa fa-download"></i> 2.3M</li>
                      </ul> */}
                  <div class="group_button">
                    <Link to={'/details'}>
                    <button type="button" class="btn btn-success">Chi tiết </button>
                    </Link>
                  
                  <button type="button" class="btn btn-danger">Đặt vé</button>
                  </div>
                </div>
                
              
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="item">
                  <img
                    src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
                    alt=""
                  ></img>
                  <p>18+</p>
                  <div class="item_movie">
                    <div class="item_movie--name">Fortnite</div>
                    <div class="item_movie--category">Giật gân, hành động</div>
                  </div>
                  {/* <ul>
                        <li><i class="fa fa-star"></i> 4.8</li>
                        <li><i class="fa fa-download"></i> 2.3M</li>
                      </ul> */}
                  <div class="group_button">
                    <Link to={'/details'}>
                    <button type="button" class="btn btn-success">Chi tiết </button>
                    </Link>
                  
                  <button type="button" class="btn btn-danger">Đặt vé</button>
                  </div>
                </div>
                
              
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="item">
                  <img
                    src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
                    alt=""
                  ></img>
                  <p>18+</p>
                  <div class="item_movie">
                    <div class="item_movie--name">Fortnite</div>
                    <div class="item_movie--category">Giật gân, hành động</div>
                  </div>
                  {/* <ul>
                        <li><i class="fa fa-star"></i> 4.8</li>
                        <li><i class="fa fa-download"></i> 2.3M</li>
                      </ul> */}
                  <div class="group_button">
                    <Link to={'/details'}>
                    <button type="button" class="btn btn-success">Chi tiết </button>
                    </Link>
                  
                  <button type="button" class="btn btn-danger">Đặt vé</button>
                  </div>
                </div>
                
              
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="item">
                  <img
                    src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
                    alt=""
                  ></img>
                  <p>18+</p>
                  <div class="item_movie">
                    <div class="item_movie--name">Fortnite</div>
                    <div class="item_movie--category">Giật gân, hành động</div>
                  </div>
                  {/* <ul>
                        <li><i class="fa fa-star"></i> 4.8</li>
                        <li><i class="fa fa-download"></i> 2.3M</li>
                      </ul> */}
                  <div class="group_button">
                    <Link to={'/details'}>
                    <button type="button" class="btn btn-success">Chi tiết </button>
                    </Link>
                  
                  <button type="button" class="btn btn-danger">Đặt vé</button>
                  </div>
                </div>
                
              
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="item">
                  <img
                    src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
                    alt=""
                  ></img>
                  <p>18+</p>
                  <div class="item_movie">
                    <div class="item_movie--name">Fortnite</div>
                    <div class="item_movie--category">Giật gân, hành động</div>
                  </div>
                  {/* <ul>
                        <li><i class="fa fa-star"></i> 4.8</li>
                        <li><i class="fa fa-download"></i> 2.3M</li>
                      </ul> */}
                  <div class="group_button">
                    <Link to={'/details'}>
                    <button type="button" class="btn btn-success">Chi tiết </button>
                    </Link>
                  
                  <button type="button" class="btn btn-danger">Đặt vé</button>
                  </div>
                </div>
                
              
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="item">
                  <img
                    src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
                    alt=""
                  ></img>
                  <p>18+</p>
                  <div class="item_movie">
                    <div class="item_movie--name">Fortnite</div>
                    <div class="item_movie--category">Giật gân, hành động</div>
                  </div>
                  {/* <ul>
                        <li><i class="fa fa-star"></i> 4.8</li>
                        <li><i class="fa fa-download"></i> 2.3M</li>
                      </ul> */}
                  <div class="group_button">
                    <Link to={'/details'}>
                    <button type="button" class="btn btn-success">Chi tiết </button>
                    </Link>
                  
                  <button type="button" class="btn btn-danger">Đặt vé</button>
                  </div>
                </div>
                
              
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="item">
                  <img
                    src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
                    alt=""
                  ></img>
                  <p>18+</p>
                  <div class="item_movie">
                    <div class="item_movie--name">Fortnite</div>
                    <div class="item_movie--category">Giật gân, hành động</div>
                  </div>
                  {/* <ul>
                        <li><i class="fa fa-star"></i> 4.8</li>
                        <li><i class="fa fa-download"></i> 2.3M</li>
                      </ul> */}
                  <div class="group_button">
                    <Link to={'/details'}>
                    <button type="button" class="btn btn-success">Chi tiết </button>
                    </Link>
                  
                  <button type="button" class="btn btn-danger">Đặt vé</button>
                  </div>
                </div>
                
              
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="item">
                  <img
                    src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
                    alt=""
                  ></img>
                  <p>18+</p>
                  <div class="item_movie">
                    <div class="item_movie--name">Fortnite</div>
                    <div class="item_movie--category">Giật gân, hành động</div>
                  </div>
                  {/* <ul>
                        <li><i class="fa fa-star"></i> 4.8</li>
                        <li><i class="fa fa-download"></i> 2.3M</li>
                      </ul> */}
                  <div class="group_button">
                    <Link to={'/details'}>
                    <button type="button" class="btn btn-success">Chi tiết </button>
                    </Link>
                  
                  <button type="button" class="btn btn-danger">Đặt vé</button>
                  </div>
                </div>
                
              
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="item">
                  <img
                    src="https://chieuphimquocgia.com.vn/Content/Images/0016820_0.jpeg"
                    alt=""
                  ></img>
                  <p>18+</p>
                  <div class="item_movie">
                    <div class="item_movie--name">Fortnite</div>
                    <div class="item_movie--category">Giật gân, hành động</div>
                  </div>
                  {/* <ul>
                        <li><i class="fa fa-star"></i> 4.8</li>
                        <li><i class="fa fa-download"></i> 2.3M</li>
                      </ul> */}
                  <div class="group_button">
                    <Link to={'/details'}>
                    <button type="button" class="btn btn-success">Chi tiết </button>
                    </Link>
                  
                  <button type="button" class="btn btn-danger">Đặt vé</button>
                  </div>
                </div>
                
              
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
