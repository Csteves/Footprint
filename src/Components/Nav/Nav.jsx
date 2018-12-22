import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/users';


class Nav extends Component {


    async componentDidMount(){
        let {id,isAdmin,loggedIn,userArticles} = this.props.state;
        this.props.updateUser({
            id,
            isAdmin,
            loggedIn,
            userArticles,
        })
    }
    async logout(){
        let res = await axios.get(`/auth/logout`);
        console.log(this.props)
        this.props.updateUser({id:'',isAdmin:false,loggedIn:res.data.loggedIn,userArticles:[]})
    }
    render() {
        let {loggedIn,id,loading} = this.props.state;

        let isLoggedIn = loggedIn && !loading
                       ?  <li>
                                <button
                                onClick={()=>this.logout()}
                                >
                                Logout
                                </button>
                           </li>
                       :  <Link to='/login' >
                                <li>
                                    <button>Login</button>
                                </li>
                            </Link>;
        let usersStuff = loggedIn && !loading ? <Link to={`personal${id}`}>
                                        <button className='sub-nav-users-btn' >
                                        My Things
                                        </button>
                                    </Link>
                                    : <div></div>;
        return (
            <div>
                <nav>
                    <Link to='/'>
                        <h3>Footprint</h3>
                    </Link>
                    <div className='nav-links-wrapper'>
                        <ul>
                            <Link to='/how' >
                                <li>How</li>
                            </Link>

                            <Link to='/where' >
                                <li>Where</li>
                            </Link>

                            <Link to='/prices' >
                                <li>prices</li>
                            </Link>
                        </ul>
                    </div>

                </nav>
                <div className='sub-nav'>
                {usersStuff}
                <ul>
                    {isLoggedIn}

                    <Link to='/register' >
                        <li>
                            <button>Register</button>
                        </li>
                    </Link>
                </ul>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        state:state.users
    }
}

export default connect(mapStateToProps,{updateUser})(Nav);