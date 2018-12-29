import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import axios from 'axios'
import './ListCard.css'

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

};

class ListCard extends Component{
   constructor(props) {
       super(props);
       this.state = {
           locationDetails:{}
       }
   }
   componentDidMount(){
       this.getLocationDetails();
   }
    async getLocationDetails(){
    let {location_id} = this.props.location;
    let res = await axios.get(`/api/locationDetails?location_id=${location_id}`);
    console.log(res.data)
    this.setState({locationDetails:res.data[location_id]})
    }
    handleSave = async (details) => {
        let{id} = this.props.state
          console.log(details)
          let res = await axios.post('/api/location',{details,id});
          console.log(res.data)
       };

    render(){
        const { classes,location } = this.props;
        console.log(this.props.state)
        let {address,city,province,phone,hours,postal_code} = this.state.locationDetails
        return (
            <Card
            className='list-card'
            >

            <CardContent>
                <Typography className={classes.title} color="textSecondary" >
                    Distance: {location.distance} Miles
                </Typography>
                <Typography variant="h4" align='right' color="secondary">
                    {this.props.labelId}
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

            <CardActions className='list-card-btn'>
                <Button
                onClick={this.handleSave}
                color="secondary"
                >
                Save This Location
                </Button>
            </CardActions>
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


export default connect(mapStateToProps)(withStyles(styles)(ListCard));