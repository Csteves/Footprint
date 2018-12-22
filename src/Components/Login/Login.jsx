import React, { Component } from 'react';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/users';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            gotUserArticles:false
        }
        this.login = this.login.bind(this);
    }

    async login(){
        let {email, password} = this.state
        let res = await axios.post('/auth/login',{email,password});
        console.log(res.data);
        let {id,loggedIn,isAdmin} = res.data;
        if(loggedIn){
            let res = await axios.get(`/api/articles?id=${id}`)
            console.log(res.data);
            this.props.updateUser({
                id:id,
                isAdmin:isAdmin,
                loggedIn:loggedIn,
                userArticles:res.data
            })
            this.setState({email:'',password:'',gotUserArticles:true});

        }
    }

    render() {
        let {gotUserArticles} = this.state;
        let {isAdmin, loggedIn} = this.props.state;
        if(isAdmin && loggedIn && gotUserArticles){
            return <Redirect to='/admin' />
        }else if(loggedIn && gotUserArticles){
            return <Redirect to='/' />
        };

        return (
            <div className='login-container'>
                <h3>Login</h3>
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
                onClick={this.login}
                >
                Login
                </button>
                <div>
                    <p>Not a user?</p>
                    <Link to="/register">
                    <button>Register</button>
                    </Link>
                </div>


            </div>
        );
    }
}
function mapStateToProps(state){
    return{state:state.users}
}
export default connect(mapStateToProps,{updateUser})( Login);