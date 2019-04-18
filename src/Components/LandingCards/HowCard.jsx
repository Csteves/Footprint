import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = {
  card: {
    maxWidth: "100%",
    maxHeight: '100%',
    minWidth: 250,
    minHeight: 500,
    height: '100%',
    // marginBottom:'20px'
  },
  media: {
    height: 350,
  },
  content: {
    paddingTop: "5px",
    paddingBottom: 0,
    marginBottom: 0
  },
  button: {
    color: '#4799c2'
  },
  source: {
    color:"#DE751F !important"
  }
};

function HowCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          title="Contemplative Reptile"
        />
        <CardContent className={classes.content} >
          <Typography gutterBottom variant="h4" component="h2">
            Find how to recycle?

                </Typography>
          <Typography variant='subtitle1'>
          <p>
          Information provided by <a className={classes.source} href="https://earth911.com/">Earth911.com!</a>
          </p>
            Find out what can be recycled, what steps you need to take to prepare your items and more in our easy to use guides.
                </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary" className={classes.button}>
          LEARN MORE
              </Button>
      </CardActions>
    </Card>
  );
}

HowCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HowCard);