import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    color: '#4799c2 !important'
  },
  close: {
    padding: theme.spacing.unit / 2,
  },
});


class NewsCard extends Component {

  render() {
    const { classes, open } = this.props;
    let { loggedIn } = this.props.state;
    let saveButton = loggedIn ?
      <Button
        onClick={() => this.props.saveArticle(this.props.id)}
        className={classes.button}>
        SAVE ARTICLE
                                </Button>
      :
      <div></div>;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {this.props.date}
          </Typography>
          <Typography variant="h5" component="h2">
            {this.props.title}
          </Typography>
        </CardContent>

        <CardActions>
          <Button href={this.props.link} className={classes.button}>
            VIEW ARTICLE
                </Button>
          {saveButton}

        </CardActions>
      </Card>
    );
  }
}

NewsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return {
    state: state.users
  }
}
export default connect(mapStateToProps)(withStyles(styles)(NewsCard));