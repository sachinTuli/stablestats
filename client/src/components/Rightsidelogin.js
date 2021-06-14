
import { useHistory } from 'react-router-dom';
import React, { useState } from "react";
import LoginService from '../services/LoginService'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';

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
    return username.length>0 && password.length>0;
  }
  
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password
    });
    if(response && !response['success']){
      alert(response['message'])
    }
    if(response && response['success']){
      // alert(response['message'])
      // //Route to dashbaord and save token here
      props.setToken(response.data)
      window.location='/dashboard';
    }
  }

 
    return(

      <div className="logRight flex ai jc tac">
      <div className="logBoxBack">
        <p className="cnavy fs35 mb10 fw3">Welcome Back.</p>
        <a className="cgreen fs20 fw3 fw3" href="/signup">New Here? Create Account</a>
        <form onSubmit={handleSubmit}   className="mt40" align="left">
          <label className="w100 fw3 inline fs16 cnavy">Email</label>
          <input value={username} onChange={(e)=>setUsername(e.target.value)} type="Email" name="username" className="w100 logInp" />
          <div className="flex ai jcb">
            <label className=" fw3 inline fs16 cnavy">Password</label><a href="JavaScript:" className="cgreen fw3 inline">Forgot password?</a>
          </div>
          <input value = {password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" className="w100 logInp" />
          <button name="logBtn" disabled={!validateForm()} className="btnFull logBtn trans br8 fs16 cwhite fw3">Sign in</button>
          &nbsp;&nbsp;
<<<<<<< HEAD
          {/* <button type="submit"  name="discordBtn" className="trans btnFull logBtn discordBtn br8 fs16 fw3">Sign in with Discord</button> */}
=======
          <button onClick={discordLogin()}  name="discordBtn" className="trans btnFull logBtn discordBtn br8 fs16 fw3">Sign in with Discord</button>
>>>>>>> 3a0f008f022038ec4964500ad03318395043f143
        </form>
      </div>
    </div> 

    )}
    
    Rightsidelogin.propTypes = {
      setToken: PropTypes.func.isRequired

    }    
    export default Rightsidelogin




    
    