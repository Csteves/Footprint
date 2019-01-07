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
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser,updateUserPosition} from '../../ducks/users';
import {getGeoKey} from '../../config';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login1 extends Component {
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
                Login
              </Typography>
              <form
              className={classes.form}
              onSubmit={this.login}>
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
              </form>
            </Paper>
          </main>
        );
    }
}

Login1.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return{state:state.users}
}

export default connect(mapStateToProps,{updateUser,updateUserPosition})(withStyles(styles)(Login1));
