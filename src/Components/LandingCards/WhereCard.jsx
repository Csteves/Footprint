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
    position: 'relative'
  },
  media: {
    height: 350,

  },
  content: {
    paddingTop: '5px',
    paddingBottom: 0,
    marginBottom: 0
  },
  button: {
    color: '#4799c2',
  }
};

function WhereCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://images.unsplash.com/photo-1507745512299-8bd0e0b3380f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2252&q=80"
          title="Contemplative Reptile"
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h4" component="h2">
            Find a location?
                </Typography>
          <Typography variant="subtitle1">
            Find locations near you that accept and recycle more than 350 products and materials, using America’s best recycling database.
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

WhereCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WhereCard);