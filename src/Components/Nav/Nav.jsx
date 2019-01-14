import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser,updateUserPosition,handleClose,handleOpen,getNewsT} from '../../ducks/users';
import {getMaterials,getFamilies} from '../../ducks/materials';

import SnackBar from '../SnackBar/SnackBar';
import HowLogo from '@material-ui/icons/ContactSupport';
import WhereLogo from '@material-ui/icons/Public';
import PricesLogo from '@material-ui/icons/AttachMoney';
import{ ReactComponent as RecLogo } from '../../rec-logo.svg'


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state={
           company:{},
           categories:[],
           mat:{},
           count:1,
           toggleMenu:false
        }
    }
         componentDidMount(){
        const{matLoading,famLoading,proLoading} = this.props.materials.materials;
        if(!matLoading && !famLoading && !proLoading){
                this.props.getNewsT();
        }
        let {id,isAdmin,loggedIn,userArticles,userLocations,zip,loading} = this.props.state;
        if(!loading){
             this.props.getMaterials();
             this.props.getFamilies();
             this.getCategories();
        }
        this.props.updateUser({
            id,
            isAdmin,
            loggedIn,
            userArticles,
            userLocations,
            zip
        });
        this.catTimer = setInterval(()=>this.mapCat(),4000)
    }
    componentWillUnmount() {
        clearInterval(this.catTimer);
      }

    //   componentDidUpdate(prevprops,prevState){
    //       if(prevState.mat.id !== this.state.mat.id){

    //       }
    //   }
        async getCategories(){
            let res = await axios.get('/api/materials');
            this.setState({categories:res.data, mat:res.data[0]});
        }

        mapCat(){
            let{categories,count} = this.state;
            if(count <= 14){
                this.setState({mat:categories[count],count:count+1})
            }else{
                this.setState({count:1, mat:categories[0]})
            }
        }
        toggleDropdown = ()=>{
            this.setState({toggleMenu:!this.state.toggleMenu})
          }

    async logout(){
        let res = await axios.get(`/auth/logout`);
        this.props.handleOpen("Logged out")
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
        let{count,mat} = this.state;
        let trending = mat.price_change ?'trending_up' : "trending_down";
        let trendingStyle = mat.price_change ? 'nav-green' : 'nav-red';
        let priceBase = 'lb' ;
        if(mat.id === 10 || mat.id === 11 || mat.id === 12){
            priceBase = 't'
        }
        let isLoggedIn = loggedIn && !loading
                       ?  <li>
                                <button
                                onClick={()=>this.logout()}
                                >
                                Sign Out
                                </button>
                           </li>
                       :  <Link to='/login' >
                                <li>
                                    <button>Sign In</button>
                                </li>
                            </Link>;
        let usersStuff = loggedIn && !loading ? <Link
        id='users-btn'
        to={`personal${id}`}>
                                        <li id='myThings-li' >
                                        Collection
                                       </li>
                                    </Link>
                                    : <div></div>;
        return (
            <div >
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
                    <section>
                        <ul className="news-list" data-length="1">
                        <Link to={`/prices${this.state.mat.id}`} >
                          <li className="news">
                              <h3>{this.state.mat.title} </h3>
                              <span>  : $ {this.state.mat.price}/{priceBase}</span>
                              <i className={`material-icons ${trendingStyle}`} >{trending}</i>
                          </li>
                        </Link>
                        </ul>
                    </section>
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
                            <div
                            className='nav-links'
                            >
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
                    {isLoggedIn}
                    <Link to='/register' >
                        <li>
                            <button>Register</button>
                        </li>
                    </Link>
                {usersStuff}
                </ul>
                </div>
                <div
                className="dropdown-menu-nav-links"
                >
                  <ul id="dropdown-ul">
                    <Link to='/how' >
                        <div className='dropdown-nav-links'
                        >
                            <li>How</li>
                        </div>
                    </Link>

                    <Link to='/where' >
                    <div className="dropdown-nav-links">
                        <li>Where</li>
                    </div>
                    </Link>

                    <Link to='/prices' >
                    <div
                    className='dropdown-nav-links'
                    >
                        <li>Prices</li>
                    </div>
                        </Link>
                </ul>
              </div>
              <SnackBar
                message={this.props.state.message}
                open={this.props.state.open}
                close={()=>this.props.handleClose()}
            />
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        state:state.users,
        materials: state.materials
    }
}

export default connect(mapStateToProps,{updateUser,updateUserPosition,getMaterials,getFamilies,handleClose,handleOpen,getNewsT})(Nav);