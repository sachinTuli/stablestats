
import React from 'react'
import PropTypes from 'prop-types'
import Leftside from '../components/leftside.js'
import Rightsidelogin from '../components/Rightsidelogin.js'


function Login(props) {
  return (
    <section className="logPageCont">
<div className="logFlex flex">
  <Leftside/>
  <Rightsidelogin setToken={props.setToken} />
 
 
</div> {/* logFlex */}
</section>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login

