import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';

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
  button:{
    color:'#4799c2 !important'
  }
};

class UserArticles extends Component {

  render(){

    const { classes,location } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {location.distance}
          </Typography>
          <Typography variant="h5" component="h2">
            {location.title}
          </Typography>
          <Typography variant="body1" component="">
            {location.address}
            <br/>
            {location.state}, {location.zip}
            <br/>
            {location.phone}
          </Typography>
        </CardContent>

        <CardActions>
              <Button
              onClick={()=>this.props.deleteLocation(location.id)}
              className={classes.button}>
                  DELETE LOCATION
              </Button>
        </CardActions>
      </Card>
    );
  }
}

UserArticles.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapStateToProps(state){
  return{state}
}
export default connect(mapStateToProps)(withStyles(styles)(UserArticles));