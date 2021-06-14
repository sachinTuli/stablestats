import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import LoginService from "../services/LoginService";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

async function loginUser(credentials) {
  return LoginService.login(credentials)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      alert("Something went wrong");
    });
}

async function discordLogin() {
  return LoginService.discordLogin()
  .then((result) => {
    return result.data;
  })
  .catch((err) => {
    alert("Something went wrong");
  });
}

function Rightsidelogin(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password,
    });
    if (response && !response["success"]) {
      alert(response["message"]);
    }
    if (response && response["success"]) {
      // alert(response['message'])
      // //Route to dashbaord and save token here
      props.setToken(response.data);
      window.location = "/dashboard";
    }
  };

  return (
    <div className="logRight flex ai jc tac">
      <div className="logBoxBack">
        <p className="cnavy fs35 mb10 fw3">Welcome Back.</p>
        <a className="cgreen fs20 fw3 fw3" href="/signup">
          New Here? Create Account
        </a>
        <form onSubmit={handleSubmit} className="mt40" align="left">
          <label className="w100 fw3 inline fs16 cnavy">Email</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="Email"
            name="username"
            className="w100 logInp"
          />
          <div className="flex ai jcb">
            <label className=" fw3 inline fs16 cnavy">Password</label>
            <a href="JavaScript:" className="cgreen fw3 inline">
              Forgot password?
            </a>
          </div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            className="w100 logInp"
          />
          <button
            name="logBtn"
            disabled={!validateForm()}
            className="btnFull logBtn trans br8 fs16 cwhite fw3"
          >
            Sign in
          </button>
          &nbsp;&nbsp;
          <button type="button" onClick = {discordLogin} name="discordBtn" className="trans btnFull logBtn discordBtn br8 fs16 fw3">Sign in with Discord</button>
        </form>
      </div>
    </div>
  );
}

Rightsidelogin.propTypes = {
  setToken: PropTypes.func.isRequired,
};
export default Rightsidelogin;
