import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import classnames from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from '@material-ui/icons/Category';
import {connect} from 'react-redux';
import axios from 'axios'

const styles = theme =>({
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }, actions: {
    display: 'flex',
    height:'10px'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

});

class programs extends Component{
   constructor(props) {
       super(props);
       this.state = {
        expanded: false,
        open: false,
        locationDetails:{},
        materialsAccepeted:[]
       }
   }


    componentDidMount(){

    }


    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };



    handleSave = async (details) => {
        let{id} = this.props.state
          console.log(details)
          let res = await axios.post('/api/location',{details,id});
            console.log(res.data)
       };

    render(){
        const { classes} = this.props;
        let {address,city,province,phone,hours,postal_code} = this.state.locationDetails;
        let {materialsAccepeted} = this.state;
        let showMore = !this.state.expanded ? 'Materials Accepted' :"";
        return (
            <Card
            className='list-card'
            >

            <CardContent>
                <Typography className={classes.title} color="textSecondary" >
                    Distance:  Miles
                </Typography>
                <Typography variant="h5" component="h2">

                </Typography>
                <Typography variant='subtitle1' >
                    {address}
                    <br/>
                    {city} {province}, {postal_code}
                </Typography>
                <Typography variant='body1'>
                    {hours}
                    <br/>
                    {phone}
                </Typography>
            </CardContent>

            <CardActions className={classes.actions} disableActionSpacing>
                <Button
                onClick={this.handleSave}
                color="secondary"
                >
                Save This Location
                </Button>
                <IconButton
            className={classnames(classes.expand,classes.button, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
          <Typography>{showMore}</Typography>
            <ExpandMoreIcon />
          </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
            <List >
            {materialsAccepeted.map((item,i)=> {
                return(
                  <ListItem
                  key={i}
                  >
                   <ListItemIcon>
                      <CategoryIcon />
                    </ListItemIcon>
                            <ListItemText
                              primary={item}
                            />
                    </ListItem>
                     )
                   })}
                </List>
            </CardContent>
            </Collapse>
            </Card>
        );
    }
    }
      programs.propTypes = {
        classes: PropTypes.object.isRequired,
      };
      function mapStateToProps(state){
        return{state}
      }


export default connect(mapStateToProps)(withStyles(styles)(programs));