import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import { message } from "antd";

const PayPal_succes = () => {
    const navigate = useNavigate()
    const params = new URLSearchParams(window.location.search)
    const paymentId = params.get('paymentId');
    const PayerID = params.get('PayerID');
   const user = params.get('user');
   const time= params.get('time');
   let veChon = params.get('veChon');
  let combo= params.get('combo');
  let price = params.get('price');
  let number = params.get('number');
  let ma_giam_gia = params.get('giamgia');
//    console.log(user, user, time, combo, price,number)  
    // console.log(paymentId,PayerID,params)
    console.log(combo, number)
    number = number.split(',,')
    combo = combo.split('-,')
   
    veChon = veChon.split('-,')
    console.log(combo, number)
  
     
    
    const  comboNew = combo.map((item)=>{
        let i = item.split(',')
        return{
            id:i[0],
            value: parseInt(i[1])
        }
    })
    veChon = veChon.map((item)=>{
      let i = item.split(',')
      return{
          id:i[0],
          name:  i[1],
          price: parseInt(i[2])
      }
  })
  console.log("veChon",veChon);
    
    console.log(comboNew)

    useEffect(()=>{
        const fetchData = async()=>{
            await axios.post("http://localhost:8080/api/ticket/add-ticket",
      {
        paymentId:paymentId,
        time : time,
        user: user,
        number: number,
        price: price,
        payment:"PayPal",
        // payment:setPayment,
        combo: comboNew,
        discount: ma_giam_gia,
        veChon:veChon
      }
    ) .then((res)=>{
      console.log(res.data)
      if(res.data.success ) {
        message.success("Thanh toán thành công")
        navigate("/default/ticket")
      }
      
    
    //   else if(!res.data.success){
    //     message.err("Thanh toán thất bại, Lỗi: ",err)
    //   }
    //   setIsModalOpen(false);
      
    }).catch(err=>{
      console.log(err)
      message.err("Thanh toán thất bại, Lỗi: ",err)
      navigate("/default/ticket")
    //   setIsModalOpen(false);
    })
        }
        fetchData()
    },[])
    return ( <>
        <div className="container"> 
          <h3 style={{
                    backgroundColor:"#26b043cc;",
                    height:100,
                    lineHeight:100,
                    color:"#ccc",
                    textAlign: "center", marginTop:200}}>Success</h3>
             
        </div>
        {/* <Link to="/default/ticket"> <button className="btn">Tiép tục mua vé</button></Link> */}
    </> );
}
 
export default PayPal_succes;