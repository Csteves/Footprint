import React, { Component } from 'react';
import Admin from './Components/Admin/Admin';
import How from  './Components/How/How';
import Landing from './Components/Landing/Landing';
import Prices from './Components/Prices/Prices';
import Register from './Components/Register/Register';
import Where from './Components/Where/Where';
import Material from './Components/Material/material';
import Login from './Components/Login/Login';
import User from './Components/User/User'

import {Switch,Route} from 'react-router-dom'
export default(
    <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/admin' component={Admin} />
        <Route path='/how' component={How} />
        <Route path='/where' component={Where} />
        <Route path='/prices' component={Prices} />
        <Route path='/prices:id' component={Material} />
        <Route path='/personal:id' component={User} />
    </Switch>
)
//need to clarify if link or nested route will be better for material component
//for referance on nested react-routes/react-4-mini