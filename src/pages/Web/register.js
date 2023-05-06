
import FormRegister from "../../components/Web/register/formRegister";


const Register = () => {
    return ( <>
    <section className="vh-150">
  <div className="container py-5 h-150"  style={{backgroundColor: "#fff", border: " 1px solid #ccc", marginTop: 50, borderRadius: 10}}>
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="img-fluid" alt="Phone image"></img>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
      <FormRegister></FormRegister>
      </div>
    </div>
  </div>
</section>
    </> );
}
 
export default Register;