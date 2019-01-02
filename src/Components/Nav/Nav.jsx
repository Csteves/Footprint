import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser,updateUserPosition} from '../../ducks/users';
import {getMaterials,getFamilies} from '../../ducks/materials';
import {getGeoKey} from '../../config';


class Nav extends Component {

    // ADD USER LOCATIONS HERE
    async componentDidMount(){
        let {id,isAdmin,loggedIn,userArticles,userLocations,zip,loading} = this.props.state;
        if(!loading){
            await this.props.getMaterials();
            await this.props.getFamilies();
        }
        this.props.updateUser({
            id,
            isAdmin,
            loggedIn,
            userArticles,
            userLocations,
            zip
        })
    }
    async logout(){
        let res = await axios.get(`/auth/logout`);
        console.log(this.props)
        this.props.updateUser({
            id:'',
            isAdmin:false,
            loggedIn:res.data.loggedIn,
            userArticles:[],
            userLocations:[],
            zip:'',
        })
        this.props.updateUserPosition({lat:null,lng:null})
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

export default connect(mapStateToProps,{updateUser,updateUserPosition,getMaterials,getFamilies})(Nav);