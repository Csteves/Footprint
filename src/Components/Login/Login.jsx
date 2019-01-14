import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {getGeoKey} from '../../config';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser,updateUserPosition,updateUserCompany,updateCompanyGeo,handleClose,handleOpen} from '../../ducks/users';
import './Login.css'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    minWidth:300,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      minWidth:300,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
  subTitle:{
      marginTop:theme.spacing.unit
  }
});

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

    handleSubmit = (event)=>{
        event.preventDefault();
        this.login()
    }
    async login(){
        let {email, password} = this.state
        let res = await axios.post('/auth/login',{email,password});
        let {loggedIn,zip_code,hasCompany,company,message} = res.data;
        if(loggedIn){
            if( zip_code){
                this.setUserPosition(zip_code);
            }
            this.getUsersThings(res.data)
            this.props.handleOpen(message)
        }
        if(hasCompany){
          this.getCompanyLocation(loggedIn,company)
          this.props.updateUserCompany(company)
        }
    }

    async getUsersThings(userInfo){
      let{id,loggedIn,isAdmin,zip_code,} = userInfo;
       let res = await axios.get(`/api/collection?id=${id}`)
       //get users coordinates for use in map
       //I STILL WANT TO USE JAVASCRIPTS GEOLOCATOR API
       this.props.updateUser({
          id,
          isAdmin,
          loggedIn,
          zip:zip_code,
          userArticles:res.data.articles,
          userLocations:res.data.locations,
       })
       this.setState({email:'',password:'',gotUserCollection:true});
    }
    async getCompanyLocation(loggedIn,company){
      let hasCompany = Object.keys(company).length;
      if( loggedIn && hasCompany ){
          const{address,city,state} = company;
          let res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},${city},${state}&key=${getGeoKey()}`)
          if(res.data.results.length){
            let location = res.data.results[0].geometry.location;
            this.props.updateCompanyGeo(location)
          }else{this.props.handleOpen('Invalid Zip Code')};
        }
     }

    async setUserPosition(zip){
        let res = await  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${getGeoKey()}`)
        if(res.data.results.length){
          let {lat, lng} = res.data.results[0].geometry.location;
          this.props.updateUserPosition({
              lat,
              lng
          })
       }else{this.props.handleOpen('Invalid Zip Code')};
    }

    render(){
        const { classes } = this.props;
        let {gotUserCollection} = this.state;
        let {isAdmin, loggedIn} = this.props.state;
        if(isAdmin && loggedIn && gotUserCollection){
            return <Redirect to='/admin' />
        }else if(loggedIn && gotUserCollection){
            return <Redirect to='/' />
        };

        return (
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              <form
              className={classes.form}
              onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input
                  onChange={(e)=>this.setState({email:e.target.value})}
                  id="email" name="email" autoComplete="email" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                   onChange={(e)=>this.setState({password:e.target.value})}
                  name="password" type="password" id="password" autoComplete="current-password" />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign in
                </Button>
                <Typography className={classes.subTitle} variant="subtitle1" align='center'>Not Registered?</Typography>
                <Link
                id='login-link'
                to="/register">
                    <Button
                    fullWidth
                    variant="contained"
                    color="default"
                    className={classes.submit}>REGISTER</Button>
                </Link>

              </form>
            </Paper>
          </main>
        );
    }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return{state:state.users}
}

export default connect(mapStateToProps,{updateUser,updateUserPosition,updateUserCompany,updateCompanyGeo,handleClose,handleOpen})(withStyles(styles)(Login));