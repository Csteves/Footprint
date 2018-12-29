import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getGeoKey} from '../../config';
import {updateUserPosition} from "../../ducks/users";
import Map from '../Map/Map';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Where.css';
import ListCard from '../WhereCards/ListCard'



class Where extends Component {
    constructor(props) {
        super(props);
        this.state = {
            material:'',
            zip:'',
            searchIds:[],
            locations:[],

        }
    }

    componentDidMount(){
        let {search} = this.props.location
        let {materials} = this.props.materials
            if(search && materials.length){
                let searchParams = new URLSearchParams(search);
                let id = searchParams.get('id');
                let material = materials.filter(item => item.material_id == id);
                this.setState({
                    material:material[0].description
                })
            }
    }
    handleSearch = () => {
        let {materials} = this.props.materials;
        let {material,zip} = this.state;
        let ids = [];
        if(material){
            let searched = materials.filter(item => item.description.toLowerCase().includes(material.toLowerCase()));
            searched.forEach(item => {
                ids.push(item.material_id)
            });
        }
        //HANDLE EITHER USER LOCATION OR ENTERED ZIP
        if(zip){
            this.getPosition(zip,ids);
        }else if(this.props.user.loggedIn){
            let {location} = this.props.user
            this.getSearchBasedLocations(location.lat,location.lng,ids)
        }else{
            this.getSearchBasedLocations(null,null,ids)
        }
        this.setState({searchId:ids})
    }
    async getSearchBasedLocations(lat,lng,ids){
        let {location} = this.props.user;
        let strIds = ids.join(',') ;
        if( lat && lng){
            let res = await axios.get(`/api/getLocations?lat=${lat}&lng=${lng}&ids=${strIds}`);
            this.setState({locations:res.data})
        }else{
            //DEFAULT TO MAP CENTER {lat:39.4367,lng:-98.3546}
            let res = await axios.get(`/api/getLocations?lat=39.4367&lng=-98.3546&ids=${strIds}`);
            this.setState({locations:res.data})
        }

    }
    async getPosition(zip,ids){
        let res = await  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${getGeoKey()}`)
        let {lat, lng} = res.data.results[0].geometry.location;
        this.getSearchBasedLocations(lat,lng,ids)
        this.props.updateUserPosition({
            lat,
            lng
        })
    }
    render() {
        let {location} = this.props.user;
        let {families, materials} = this.props.materials
        let {zip,material,searchIds,locations} = this.state;
        const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234';
        let labelIndex = 0;
        let listOfLocations = locations.map((place,index) => {
            return(
                <div className="location-list-container" key={index} >
                    <ListCard
                    location={place}
                    labelId={labels[labelIndex++ % labels.length]}
                    />
                </div>
            )
        })
        return (
            <div className='main-where-container'>
            <div className="main-where-search-container">
                <div className="quick-search-bar" >

                </div>
              <div className='where-search-bar' >
            <div className="where-header" >
                <h1>FIND A SOLUTION TO YOUR RECYCLING NEEDS</h1>
            </div>
                  <div className="search-materials"  >
                      <h6>SEARCH BY MATERIAL</h6>
                       <TextField
                        id="outlined-name"
                        label="Search materials"
                        // className={classes.textField}
                        value={this.state.material}
                        onChange={(e)=>this.setState({material:e.target.value})}
                        margin="normal"
                        variant="outlined"
                        />
                  </div>
                  <div className="search-materials">
                      <h6>ZIP CODE</h6>
                      <TextField
                        id="outlined-name"
                        label="ZIP"
                        // className={classes.textField}
                        value={this.state.zip}
                        onChange={(e)=>this.setState({zip:e.target.value})}
                        margin="normal"
                        variant="outlined"
                        />
                  </div>
                  <Button
                  variant="outlined"
                  color="primary"
                  id="where-search-btn"
                  onClick={this.handleSearch}
                  >
                       SEARCH
                  </Button>
              </div>
            </div>
                <div className="map-list-container">
                    <div className="where-list-container" >
                        {listOfLocations}
                    </div>
                <div className='map-container'>
                    <Map
                    location={location}
                    locations={locations}
                    />
                </div>
              </div>

            </div>
        );
    }
}
function mapStateToProps(state){
    return{user:state.users, materials:state.materials}
}
export default connect(mapStateToProps,{updateUserPosition})(Where);