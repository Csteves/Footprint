import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser,updateUserPosition,updateUserCompany,handleOpen} from '../../ducks/users';
import {getGeoKey} from '../../config';
import RegisterModal from '../RegisterModal/RegisterModal'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AccountIcon from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    minWidth:300,
    [theme.breakpoints.down('xs')]: {
      margin:0,

    },
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

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            zip:'',
            isAdmin:false,
            isIndustry:false,
            userCompany:{},
            open:false
        }
        this.register = this.register.bind(this);
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        this.register()
    }
    handleClose = ()=>{
        this.setState({open:false,isIndustry:false})
    }


    async register(company){
        const {email, password,zip} = this.state;
        let hasCompany = Object.keys(company).length;
         if(hasCompany){
            this.registerCompany(company);
        }else {
            let res = await axios.post('/auth/register',{email,password,zip});
            let {id,loggedIn,isAdmin,zip_code} = res.data
            this.props.updateUser({
                id,
                loggedIn,
                isAdmin,
                zip:zip_code,
                userArticles:[],
                userLocations:[],
            })
            if(loggedIn && zip_code){
                this.setUserPosition(zip_code);
            }
            this.setState({email:'',password:'',isAdmin, zip:''});
            this.props.history.push('/');
        }

    }
     registerCompany = async(company) =>{
         const {email, password,zip} = this.state;
         let{title,address,city,state,phone} = company
         let res = await axios.post('/auth/register',{email,password,zip,hasCompany:true});
         let {loggedIn,isAdmin,zip_code} = res.data;
         this.props.updateUser({
             id:res.data.id,
             loggedIn,
             isAdmin,
             zip:zip_code,
             userArticles:[],
            userLocations:[],
         })
        let results = await axios.post('/auth/register-company',{id:res.data.id,title,address,city,state,phone,zip:company.zip});
        this.props.handleOpen(results.data.message)
        if(results.data.company.id){
            let{title,address,city,state,phone} = results.data.company;
            this.props.updateUserCompany({title,address,city,state,phone,zip:results.data.zip})
        }
        if(loggedIn && zip_code){
            this.setUserPosition(zip_code);
        }
        this.setState({email:'',password:'',isAdmin, zip:'',open:false});
        this.props.history.push('/');
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

        return (
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <AccountIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
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

                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="zip">Zip Code</InputLabel>
                    <Input
                    onChange={(e)=>this.setState({zip:e.target.value})}
                    name="zip" type="text" id="zip" autoComplete="none" />
                  </FormControl>

                <FormControlLabel
                  control={<Checkbox onChange={()=>this.setState({isIndustry:!this.state.isIndustry,open:true})} value='industry' checked={this.state.isIndustry} color="primary" />}
                  label="Provide recycling services?"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Register
                </Button>
                <Typography className={classes.subTitle} variant="subtitle1" align='center'>Already registered?</Typography>
                <Link
                id='login-link'
                to="/login">
                    <Button
                    fullWidth
                    variant="contained"
                    color="default"
                    className={classes.submit}>Login</Button>
                </Link>

              </form>
            </Paper>
            <RegisterModal
            open={this.state.open}
            close={this.handleClose}
            submit={this.register}
            />
          </main>
        );
    }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null,{updateUser,updateUserPosition,updateUserCompany,handleOpen})(withStyles(styles)(Register));