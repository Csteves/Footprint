import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser,updateUserPosition} from '../../ducks/users';
import {getMaterials,getFamilies} from '../../ducks/materials';
import HowLogo from '@material-ui/icons/ContactSupport';
import WhereLogo from '@material-ui/icons/Public';
import PricesLogo from '@material-ui/icons/AttachMoney';
import{ ReactComponent as RecLogo } from '../../rec-logo.svg'


class Nav extends Component {

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
        });
        //USE TO GET LOCATION OF COMAPNY IF USER HAS COMPANY
        // if(!this.state.loading && loggedIn && userCompany.title.length){
        //     const{address,city,state} = userCompany;
        //     let res = await Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},${city},${state}&key=${getGeoKey()}`)
        //     let location = res.data.results[0].geometry.location;
        //     console.log(location)
        //     this.setState(state=>({...state,userCompany:location}))
        //   }
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
            userCompany:{},
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
        let usersStuff = loggedIn && !loading ? <Link
        id='users-btn'
        to={`personal${id}`}>
                                        <li id='myThings-li' >
                                        My Things
                                       </li>
                                    </Link>
                                    : <div></div>;
        return (
            <div>
                <nav>
                    <Link to='/'>
                    <div className='nav-title-wrapper'>
                        <RecLogo
                        className="nav-logo"
                        />
                        <h3
                        id='nav-title'
                        >FOOTPRINT</h3>
                    </div>
                    </Link>
                    <div className='nav-links-wrapper'>
                        <ul>
                            <Link to='/how' >
                                <div className='nav-links'
                                >
                                    <HowLogo
                                    color="inherit"
                                    fontSize='large'/>
                                    <li>How</li>
                                </div>

                            </Link>

                            <Link to='/where' >
                            <div className="nav-links">
                                <WhereLogo
                                color="inherit"
                                fontSize='large'
                                />
                                <li>Where</li>
                            </div>
                            </Link>


                            <Link to='/prices' >
                            <div className='nav-links'>
                                <PricesLogo
                                color="inherit"
                                fontSize='large'
                                />
                                <li>Prices</li>
                            </div>
                            </Link>
                        </ul>
                    </div>


                </nav>
                <div className='sub-nav'>
                <ul>
                {usersStuff}
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