import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'



const styles = theme => ({
  paper: {
    position: 'absolute',
    top:'30%',
    left:"30%",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class MaterialModal extends React.Component {



  render() {
    const { classes,material } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <div  className={classes.paper}>
            <Typography variant="h6" id="modal-title">
            {material.description}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              {material.long_description}
            </Typography>
            <Link to={`/where?id=${material.material_id}`}>
              <button>Find A Location</button>
            </Link>
          </div>
        </Modal>
      </div>
    );
  }
}

MaterialModal.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(MaterialModal);
