import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            isAdmin:false
        }
        this.register = this.register.bind(this);
    }
    async register(){
        let {email, password} = this.state
        let res = await axios.post('/auth/register',{email,password});
        console.log(res.data);
        let {id,loggedIn,isAdmin} = res.data
        this.props.updateUser({
            id:id,
            loggedIn:loggedIn,
            isAdmin:isAdmin
        })
        this.setState({email:'',password:'',isAdmin:isAdmin});
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

export default Register;