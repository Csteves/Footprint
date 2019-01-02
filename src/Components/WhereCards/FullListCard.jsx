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
import {updateLocations} from '../../ducks/users'
import axios from 'axios'
import './ListCard.css'

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

class ListCard extends Component{
   constructor(props) {
       super(props);
       this.state = {
        expanded: false,
        open: false,
        locationDetails:{},
        materialsAccepeted:[]
       }
   }

    //FIX SAVE FUNCIONALITY- CONDTIONALALY RENDER AND HANDLESAVE FUNC IS BROKE ,add distance too
    componentDidMount(){
       this.getLocationDetails();
    }


    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    async getLocationDetails(){
    let {location_id} = this.props.location;
    let res = await axios.get(`/api/locationDetails?location_id=${location_id}`);
    this.getMaterialsAccepted(res.data[location_id].materials)
    this.setState({locationDetails:res.data[location_id]})
    }
    getMaterialsAccepted(materialsArr){
        let{materials} = this.props.state.materials
        let ids = [];
        let materialsAccepeted =[]
        materialsArr.forEach(item => ids.push(item.material_id));
        materials.filter(item => ids.includes(item.material_id))
        .forEach(item => materialsAccepeted.push(item.description))
        this.setState({materialsAccepeted})
    }

    handleSave = async () => {
      let{id} = this.props.state.users
      let {locationDetails} = this.state;
      let details = locationDetails;
      console.log(id);
      let {distance} = this.props.location;
      console.log(distance)
      let res = await axios.post('/api/location',{details,id,distance});
      console.log(res.data)
      this.props.updateLocations(res.data.usersLocations)
       };

    render(){
        const { classes,location } = this.props;
        console.log(location);
        let {address,city,province,phone,hours,postal_code} = this.state.locationDetails;
        let {materialsAccepeted} = this.state;
        let showMore = !this.state.expanded ? 'Materials Accepted' :"";
        return (
            <Card
            className='list-card'
            >

            <CardContent>
                <Typography className={classes.title} color="textSecondary" >
                    Distance: {location.distance} Miles
                </Typography>
                <Typography variant="h5" component="h2">
                {location.description}
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
      ListCard.propTypes = {
        classes: PropTypes.object.isRequired,
      };
      function mapStateToProps(state){
        return{state}
      }


export default connect(mapStateToProps,{updateLocations})(withStyles(styles)(ListCard));