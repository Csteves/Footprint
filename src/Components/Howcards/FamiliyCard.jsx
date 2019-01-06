import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import classnames from 'classnames';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MaterialModal from '../MaterialModal/MaterialModal';
import getFamilyImage from './familyImages'
import '../How/How.css'

const styles = theme => ({
  card: {
    maxWidth: "100%",
    minWidth: 275,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
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
  content:{
      maxHeight:'250px',
      overflowY: "scroll",
  },
  button:{
      marginBottom:'30px'
  }

});

class FamilyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      selectedMat:{},
      open: false,
    };

  }


  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  //=============HANDLE MODAL FUNC'S
  handleOpen = (id) => {
    let selectedMat = this.props.familyItems.filter(material => material.material_id === id)
    this.setState({ selectedMat:selectedMat[0],open: true});
  };

  handleClose = () => {
    this.setState({ open: false, selectedMat:{} });
  };

  render() {
    const { classes,familyItems,famId } = this.props;
    console.log(typeof famId,famId)
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={getFamilyImage(famId)}
          title="Paella dish"
        />
        <CardContent>
          <Typography
           variant='h4'
           color="textPrimary"
           >
           {this.props.title}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand,classes.button, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>

          <CardContent className={classes.content}>
          <Table className={classes.table}>
        <TableHead>
          <TableRow >
            <TableCell
            id='how-tablecell-head'
             variant='head'
             >{this.props.title}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {familyItems.map(row => {
            return (
                    <TableRow
                    onClick={()=>this.handleOpen(row.material_id)}
                    style={{cursor:"pointer"}}
                    hover
                    key={row.material_id}
                    >
                        <TableCell
                        className='how-table-cell'
                        component="th" scope="row" style={{width:"100%"}}>
                            {row.description}
                        </TableCell>
                    </TableRow>
            );
          })}
        </TableBody>
      </Table>
          </CardContent>
        </Collapse>
        <MaterialModal
        open={this.state.open}
        handleClose={this.handleClose}
        material={this.state.selectedMat}
        />
      </Card>
    );
  }
}

FamilyCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FamilyCard);
