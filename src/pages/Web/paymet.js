


import { useLocation } from "react-router-dom";
import PaymentContent from "../../components/Web/payment/paymentContent";


const PayMent = () => {
    let { state } = useLocation();
    console.log(state)
    return ( <div className="container">
            <PaymentContent state ={state}></PaymentContent>
    </div> );
}
 
export default PayMent;

