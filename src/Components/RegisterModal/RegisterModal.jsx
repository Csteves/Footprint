import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AccountIcon from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import states from '../../states';
import '../Register/Register.css'




const styles = theme => ({
  paper: {
    position: 'absolute',
    top: '10%',
    left: "35%",
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    margin: "0 auto",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.only('xs')]: {
      width: 300,
      left: "3%",
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: theme.spacing.unit * 50,
      left: "25%"
    },
    [theme.breakpoints.up('md')]: {
      top: '10%',
      left: "35%",
      width: theme.spacing.unit * 60,
    },

  },
  main: {
    width: 'auto',
    minWidth: 350,
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
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
  subTitle: {
    marginTop: theme.spacing.unit
  },
  stateZip: {
    width: theme.spacing.unit * 20,
  }
});

class RegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      address: '',
      phone: '',
      city: '',
      state: '',
      zip: '',
      materialsAccepted: ''

    }
  }
  handleSubmit = (event) => {
    const { title, address, city, phone, state, zip } = this.state
    event.preventDefault();
    this.props.submit({
      title,
      address,
      city,
      phone,
      state,
      zip
    })
  }

  render() {
    const { classes } = this.props;
    let selectSt = states.map((st, i) => {
      return (
        <MenuItem
          key={i}
          value={st}
        >
          {st}
        </MenuItem>
      )
    })

    return (
      <div >
        <Modal
          className="how-modal"
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.close}
        >
          <main>

            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <AccountIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Company Details
              </Typography>
              <form
                className={classes.form}
                onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="title">Company Title</InputLabel>
                  <Input
                    onChange={(e) => this.setState({ title: e.target.value })}
                    id="title" name="title" autoFocus />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="address" autoComplete="off" > Address</InputLabel>
                  <Input
                    onChange={(e) => this.setState({ address: e.target.value })}
                    id="address" name="address" autoComplete="off" />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="city" autoComplete="off" >City</InputLabel>
                  <Input
                    onChange={(e) => this.setState({ city: e.target.value })}
                    id="city" name="city" autoComplete="off" />
                </FormControl>

                <div className="state-and-zip">
                  <FormControl margin="normal" className={classes.stateZip} required >
                    <InputLabel htmlFor="state">State</InputLabel>
                    <Select
                      value={this.state.state}
                      onChange={(e) => this.setState({ state: e.target.value })}
                    >
                      {selectSt}
                    </Select>
                  </FormControl>

                  <FormControl margin="normal" required >
                    <InputLabel htmlFor="zip">Zip Code</InputLabel>
                    <Input
                      onChange={(e) => this.setState({ zip: e.target.value })}
                      name="zip" inputProps={{pattern:"[0-9]{5}"}} type="text" id="zip" autoComplete="off" />
                  </FormControl>
                </div>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="phone">Phone</InputLabel>
                  <Input
                    onChange={(e) => this.setState({ phone: e.target.value })}
                    name="phone" type="tel" id="password" autoComplete="off" inputProps={{pattern:"[0-9]{3}-[0-9]{3}-[0-9]{4}"}} />
                  <span>
                    <Typography color="textSecondary" >Format: 123-456-7890</Typography>
                  </span>
                </FormControl>

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
        </Modal>
      </div>
    );
  }
}

RegisterModal.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(RegisterModal);