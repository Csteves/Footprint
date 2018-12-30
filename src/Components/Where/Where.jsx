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
import QuickSearchBar from './QuickSearchBar'
import SubHeader from './SubHeader';


class Where extends Component {
    constructor(props) {
        super(props);
        this.state = {
            material:'',
            zip:'',
            searchIds:[],
            locations:[],
            matMatchArr:[],
            subHeadFlag:false
        }
    }

    componentDidMount(){
        let {search} = this.props.location
        let {materials} = this.props.materials
            if(search && materials.length){
                let searchParams = new URLSearchParams(search);
                let id = searchParams.get('id');
                let material = materials.filter(item => item.material_id === +id);
                this.setState({
                    material:material[0].description
                })
            }
    }

    handleInput(value){
        this.setState({material:value,matMatchArr:this.typeAhead(value)});
    }


    typeAhead(input){
        let{materials} = this.props.materials;
        const regex = new RegExp(input, 'gi');
        if(materials && input !== ''){
            return materials.filter(item =>{
                return item.description.match(regex)
            })
        }else{return []}
    }
    handleSwap = (name)=>{

    }
    //==========================================
    //SEARCH API FUNCTIONS
    //==========================================
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
        let strIds = ids.join(',') ;
        if( lat && lng){
            let res = await axios.get(`/api/getLocations?lat=${lat}&lng=${lng}&ids=${strIds}`);
            this.setState({locations:res.data,subHeadFlag:true})
        }else{
            //DEFAULT TO MAP CENTER {lat:39.4367,lng:-98.3546}
            let res = await axios.get(`/api/getLocations?lat=39.4367&lng=-98.3546&ids=${strIds}`);
            this.setState({locations:res.data,subHeadFlag:true})
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
    test = e =>{
        console.log(e.currentTarget.textContent)
    }
    render() {
        let {location} = this.props.user;
        let {locations,matMatchArr,zip,material,subHeadFlag} = this.state;
        let visible = subHeadFlag? 'inline' : 'none';
        const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234';
        let labelIndex = 0;
        let matTypeAhead =[];
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
        if(matMatchArr.length){
            matTypeAhead = matMatchArr.map((item,index) =>{
                return(<li
                    onClick={(e)=>this.handleInput(e.currentTarget.textContent)}
                    key={index}>
                    {item.description}
                    </li>)
            })
        }

        return (
            <div className='main-where-container'>
            <div className="main-where-search-container">
                <div
                className="quick-search-bar" >
                    <QuickSearchBar/>
                </div>
              <div className='where-search-bar' >
            <div className="where-header" >
                <h1>FIND A SOLUTION TO YOUR RECYCLING NEEDS</h1>
            </div>
                  <div className="search-materials">
                      <h6>ZIP CODE</h6>
                      <TextField
                        id="outlined-name"
                        label="Enter ZIP"
                        value={this.state.zip}
                        onChange={(e)=>this.setState({zip:e.target.value})}
                        margin="normal"
                        variant="outlined"
                        />
                  </div>
                  <div className="search-materials"  >
                      <h6>SEARCH BY MATERIAL</h6>
                       <TextField
                        autoComplete="off"
                        id="outlined-name"
                        label="Plastic, Electronics, Aluminum, Etc..."
                        value={this.state.material}
                        onChange={(e)=>this.handleInput(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        />
                        <Button
                        variant="outlined"
                        color="primary"
                        id="where-search-btn"
                        onClick={this.handleSearch}
                        size='large'
                        >
                            SEARCH
                        </Button>
                        <ul className='material-typeAhead'>
                            {matTypeAhead}
                        </ul>
                  </div>
              </div>
            </div>
                <div style={{display:visible}} >
                    <SubHeader
                    handleSwap={this.handleSwap}
                    searchCriteria={{zip,material}}
                    />
                </div>
                <div className="where-map-list-container">
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