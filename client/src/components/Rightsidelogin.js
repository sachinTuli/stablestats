
import { useHistory } from 'react-router-dom';
import React, { useState } from "react";

async function loginUser(credentials){
  return fetch('http://localhost:3001/login',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(credentials)
  })
  .then(data=>data.json())
}

async function discordLogin() {
  return fetch("http://localhost:3001/auth/discord", {
    method: 'GET',
    headers: {
      'Content-Type':'application/json'
    }
  }).then(data=>{
    console.log(data.json())
  })
}

function Rightsidelogin(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  function validateForm(){
    return email.length>0 && password.length>0;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
  }

 
    return(

      <div className="logRight flex ai jc tac">
      <div className="logBoxBack">
        <p className="cnavy fs35 mb10 fw3">Welcome Back.</p>
        <p className="cgreen fs20 fw3 fw3">New Here? Create Account</p>
        <form onSubmit={handleSubmit}   className="mt40" align="left">
          <label className="w100 fw3 inline fs16 cnavy">Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="Email" name="email" className="w100 logInp" />
          <div className="flex ai jcb">
            <label className=" fw3 inline fs16 cnavy">Password</label><a href="JavaScript:" className="cgreen fw3 inline">Forgot password?</a>
          </div>
          <input value = {password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" className="w100 logInp" />
          <button name="logBtn" disabled={!validateForm()} className="btnFull logBtn trans br8 fs16 cwhite fw3">Sign in</button>
          &nbsp;&nbsp;
          <button onClick={discordLogin()}  name="discordBtn" className="trans btnFull logBtn discordBtn br8 fs16 fw3">Sign in with Discord</button>
        </form>
      </div>
    </div> 





    )}
    
    
    
    export default Rightsidelogin