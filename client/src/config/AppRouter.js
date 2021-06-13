import React from 'react';
import {
    BrowserRouter as Router,
    Route,Redirect
} from "react-router-dom";
import Dashboard from '../screens/Dashboard.js'
import Login from '../screens/Login.js'
import Signup from '../screens/Signup.js'

import useToken from '../services/useToken';


export default function AppRouter() {
    const { token, setToken } = useToken();

    return (
        <div>
            <Router>
                {!token?<Route path='/' exact ><Login setToken={setToken}/></Route>:<Redirect to={"/dashboard"}/>}
                {token?<Route path='/dashboard'  component={Dashboard} />:<Redirect to={"/"}/>}
                <Route path='/signup'  component={Signup}  />
               
            </Router>
        </div>
    )
}
