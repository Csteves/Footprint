import React, { Component } from 'react';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser,updateUserPosition} from '../../ducks/users';
import {getGeoKey} from '../../config';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            gotUserCollection:false
        }
        this.login = this.login.bind(this);
    }

    async login(){
        let {email, password} = this.state
        let res = await axios.post('/auth/login',{email,password});
        console.log(res.data);
        let {id,loggedIn,isAdmin,zip_code} = res.data;
        //get users saved items upon login
        if(loggedIn){
            //GOING TO USE GET COLLECTION TO GET ALL USERS INFO WITH JOIN
            let res = await axios.get(`/api/collection?id=${id}`)
            console.log(res.data)
            //get users coordinates for use in map
            //I STILL WANT TO USE JAVASCRIPTS GEOLOCATOR API
            if( zip_code){
                this.setUserPosition(zip_code);
            }
            this.props.updateUser({
                id,
                isAdmin,
                loggedIn,
                zip:zip_code,
                userArticles:res.data.articles,
                userLocations:res.data.locations
            })
            this.setState({email:'',password:'',gotUserCollection:true});
        }
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
        let {gotUserCollection} = this.state;
        let {isAdmin, loggedIn} = this.props.state;
        if(isAdmin && loggedIn && gotUserCollection){
            return <Redirect to='/admin' />
        }else if(loggedIn && gotUserCollection){
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
export default connect(mapStateToProps,{updateUser,updateUserPosition})( Login);