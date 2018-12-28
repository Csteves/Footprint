import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/users';
import {getGeoKey} from '../../config';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            zip:'',
            isAdmin:false
        }
        this.register = this.register.bind(this);
    }
    async register(){
        let {email, password,zip} = this.state
        let res = await axios.post('/auth/register',{email,password,zip});
        console.log(res.data);
        let {id,loggedIn,isAdmin,zip_code} = res.data
        this.props.updateUser({
            id,
            loggedIn,
            isAdmin,
            zip:zip_code
        })
        if(loggedIn && zip_code){
            this.setUserPosition(zip_code);
        }
        this.setState({email:'',password:'',isAdmin, zip:''});
        this.props.history.push('/');
    }
    async setUserPosition(zip){
        let res = await  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${getGeoKey()}`)
        console.log(res.data);
        let {lat, lng} = res.data.results[0].geometry.location;
        this.props.updateUserPosition({
            lat,
            lng
        })
    }
    render() {
        return (
            <div className='register-container'>
                <h3>Register</h3>
                <div className='email-wrapper'>
                    <p>Email:</p>
                    <input
                    value={this.state.email}
                    onChange={(e)=>this.setState({email:e.target.value})}
                    type="text"/>
                </div>
                <div className='password-wrapper'>
                    <p>Password:</p>
                    <input
                    value={this.state.password}
                    onChange={(e)=>this.setState({password:e.target.value})}
                    type="text"/>
                </div>
                <div className='zip-wrapper'>
                <em>*Allows us to find locations near you</em>
                    <p>Zip-code:</p>
                    <input
                    value={this.state.zip}
                    onChange={(e)=>this.setState({zip:e.target.value})}
                    type="text"/>
                </div>
                <button
                onClick={this.register}
                >
                register
                </button>
                <div>
                    <p>Already a user?</p>
                    <Link to='/login'>
                    <button>Login</button>
                    </Link>
                </div>

            </div>
        );
    }
}

export default connect(null,{updateUser})(Register);