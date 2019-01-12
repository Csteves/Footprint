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
  programActions:{
    height:"4px"
  }

});

class programs extends Component{
   constructor(props) {
       super(props);
       this.state = {
        expanded: false,
        open: false,
        programDetails:{},
        materialsAccepeted:[],

       }
   }
     componentDidMount(){
      const{program_id} = this.props.program
      this.getDetails(program_id);
    }

    componentDidUpdate(prevProps){
      const{program_id} = this.props.program
        if(prevProps.program.program_id !== program_id){
          this.getDetails(program_id)
        }
    }
    async getDetails(id){
      let res = await axios.get(`/api/getProgramDetails?program_id=${id}`);
      let materials =  res.data[id].materials.map(mat => mat.description)
      this.setState({programDetails:res.data[id],materialsAccepeted:materials})
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };


    render(){
        const { classes,program} = this.props;
        const {proLoading} = this.props.state.materials;
        let {description,address,city,province,phone,hours,postal_code,notes} = this.state.programDetails;
        let{materialsAccepeted} = this.state;
        let note;
         if(!proLoading){
           note = <Typography variant="body2" >{notes}</Typography>
         }else{ return null}
        let showMore = !this.state.expanded ? 'Materials Accepted' :"";
        return (
            <Card
            className='list-card'
            >

            <CardContent>
                <Typography className={classes.title} color="secondary" align="right">
                    Distance:  Miles {program.distance}
                </Typography>
                <Typography variant="h5" component="h2">
                  {description}
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
               {note}
            </CardContent>

            <CardActions className={classes.programActions} disableActionSpacing>
                <IconButton
            className={classnames(classes.expand,classes.button, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
          <Typography variant="subtitle2" color="primary">{showMore}</Typography>
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