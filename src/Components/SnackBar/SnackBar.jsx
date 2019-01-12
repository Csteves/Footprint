import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class SnackBar extends React.Component {
  state = {
    open: false,
  };

  render() {
    const { classes, open, close,message } = this.props;
    return (
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={3000}
          onClose={close}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={close}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
    );
  }
}

SnackBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SnackBar);