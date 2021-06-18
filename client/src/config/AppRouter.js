import React from 'react';
import {
    BrowserRouter as Router,
    Route,Redirect
} from "react-router-dom";
import Dashboard from '../screens/Dashboard.js'
import Login from '../screens/Login.js'
import Signup from '../screens/Signup.js'
import Payment from '../screens/card/stripecheckout.js'

import useToken from '../services/useToken';


export default function AppRouter() {
    const { token, setToken } = useToken();

    return (
        <div>
            <Router>
                {<Route path='/' exact ><Login setToken={setToken}/></Route>}
                {<Route path='/dashboard'  component={Dashboard} />}
                <Route path='/signup'  component={Signup}  />
                <Route path='/payment'  component={Payment} />
            </Router>
        </div>
    )
}
