import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/users';


class Nav extends Component {

    //figure out how to make logout leave upon logout
    // componentDidUpdate(prevProps){
    //     let {id,loggedIn,isAdmin} = this.props.state;
    //     if(prevProps.state.loggedIn !== this.props.state.loggedIn){
    //         this.props.updateUser({id,isAdmin,loggedIn});
    //     }
    // }
    async logout(){
        let res = await axios.get(`/auth/logout`);
        console.log(res.data)
        this.props.updateUser({id:'',isAdmin:false,loggedIn:res.data.loggedIn})
    }
    render() {
        let {loggedIn,id} = this.props.state;
        let isLoggedIn = loggedIn
                       ?  <li>
                                <button
                                onClick={()=>this.logout()}
                                >
                                Logout
                                </button>
                           </li>
                       : <li></li>;
        let usersStuff = loggedIn ? <Link to={`personal${id}`}>
                                        <button>
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
                    <Link to='/login' >
                        <li>
                            <button>Login</button>
                        </li>
                    </Link>
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
        state
    }
}

export default connect(mapStateToProps,{updateUser})(Nav);