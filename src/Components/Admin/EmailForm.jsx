import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {handleOpen} from '../../ducks/users';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Mail from '@material-ui/icons/Email';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
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
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class EmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
           sender:'',
           receiver:'',
           subject:'',
           message:''
        }

    }

    handleSubmit = (event)=>{
        event.preventDefault();
        this.sendEmail()
    }
    sendEmail = async()=>{
        const {sender,receiver,subject,message} = this.state;
        let res = await axios.post('/api/email',{sender,receiver,subject,message});
        console.log(res.data)
        this.props.handleOpen(res.data.message);
        this.setState({sender:'',receiver:'',subject:'',message:''})
    }


    render(){
        const { classes } = this.props;

        return (
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <Mail />
              </Avatar>
              <Typography component="h1" variant="h5">
                Compose Email
              </Typography>
              <form
              className={classes.form}
              onSubmit={this.handleSubmit}>
               <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="name">From: Name</InputLabel>
                    <Input
                    onChange={(e)=>this.setState({sender:e.target.value})}
                    name="name" type="text" id="name" autoComplete="none" value={this.state.sender} />
                  </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">To: Email Address</InputLabel>
                  <Input
                  onChange={(e)=>this.setState({receiver:e.target.value})}
                  id="email" name="email" autoComplete="email" value={this.state.receiver} autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="subject">Subject</InputLabel>
                  <Input
                   onChange={(e)=>this.setState({subject:e.target.value})}
                  name="subject" type="text" id="subject" value={this.state.subject} autoComplete="none" />
                  </FormControl>

                  <FormControl margin="normal" required fullWidth>
                  {/* <InputLabel htmlFor="message">Message</InputLabel> */}
                  <TextField
                   className={classes.textField}
                   onChange={(e)=>this.setState({message:e.target.value})}
                  name="message" type="text" label="Message" value={this.state.message} id="outlined-multiline-flexible" autoComplete="none"  multiline
                   variant="outlined" margin="normal" />
                  </FormControl>


                <FormControlLabel
                  control={<Checkbox onChange={()=>null} value='industry'  color="primary" />}
                  label="Send to all users?"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                 Submit
                </Button>

              </form>
            </Paper>

          </main>
        );
    }
}

EmailForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null,{handleOpen})(withStyles(styles)(EmailForm));