import React, { useState } from "react";
import LoginService from '../services/LoginService'

async function signup(credentials){
  return LoginService.signup(credentials).then((result) => {
      return result.data;
  }).catch((err) => {
      alert("Something went wrong");
  });
}

function Rightsidesignup(){
const [email, setEmail] = useState("");
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [name, setName] = useState("")
const [phoneNumber, setPhoneNumber] = useState("")


  const handleSubmit = async e => {
    e.preventDefault();
    if(password!==confirmPassword){
      alert("Password does not match")
      return;
    }
    if(phoneNumber && phoneNumber.length!=10){
      alert("Enter a valid phone number")
      return;
    }
    const response = await signup({
      email,
      password,
      name,
      phoneNumber
    });
    if(response && !response['success']){
      alert(response['message'])
    }
    if(response && response['success']){
      alert(response['message'])
      window.location='/';
    }
  }


return(
<div className="logRight flex jc tac">
<div className="logBoxBack">
  <p className="cnavy fs35 mb10 fw3">Welcome Back.</p>
  <p className="cgray fs18 fw3 fw3">Enter your details to create your account</p>
  <a className="cgreen fs20 fw3 fw3" href="/">Already Have a account!</a>

  <form onSubmit={handleSubmit} className="mt40" align="left">
    <div className="row">
      <div className="col-md-6">
        <label className="w100 fw3 inline fs16 cnavy">Name</label>
        <input required value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" className="w100 logInp" />
      </div>
      <div className="col-md-6">
        <label className="w100 fw3 inline fs16 cnavy">Email</label>
        <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" className="w100 logInp" />
      </div>
    </div>
    <label className="w100 fw3 inline fs16 cnavy">Phone Number (Optional)</label>
    <input value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} name="phoneNumber" className="w100 logInp" />
    <div className="row">
      <div className="col-md-6">
        <label className="w100 fw3 inline fs16 cnavy">Password</label>
        <input required value={password} onChange={ (e)=> setPassword(e.target.value)} type="password" name="password" className="w100 logInp" />
      </div>
      <div className="col-md-6">
        <label className="w100 fw3 inline fs16 cnavy">Confirm Password</label>
        <input required value={confirmPassword} onChange={ (e)=> setConfirmPassword(e.target.value)} type="password" name="confirmPassword" className="w100 logInp" />
      </div>
    </div>
    <button type="submit" name="logBtn" className="btnFull logBtn trans br8 fs16 cwhite fw3">Sign Up</button>
    &nbsp;&nbsp;
    {/* <button type="submit" name="discordBtn" className="trans btnFull logBtn discordBtn br8 fs16 fw3">Sign up with Discord</button> */}
  </form>
</div>
</div> 

)
}
export default Rightsidesignup