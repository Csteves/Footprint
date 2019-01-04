import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getGeoKey} from '../../config';
import {updateUserPosition} from "../../ducks/users";
import Map from '../Map/Map';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Where.css';
import ListCard from '../WhereCards/ListCard';
import FullListCard from '../WhereCards/FullListCard';
import QuickSearchBar from './QuickSearchBar'
import SubHeader from './SubHeader';
import Programs from './Programs';
import MapId from '../../mapId'


class Where extends Component {
    constructor(props) {
        super(props);
        this.state = {
            material:'',
            zip:'',
            searchIds:[],
            locations:[],
            matMatchArr:[],
            subHeadFlag:false,
            displayFullList:false,
            displayMap:true,
            displayPrograms:false,
            inputRef:{}
        }
    }

    componentDidMount(){
        let {search} = this.props.location;
        let {materials} = this.props.materials;
        let {zip,loggedIn} = this.props.user
            if(search && materials.length){
                let searchParams = new URLSearchParams(search);
                let id = searchParams.get('id');
                let material = materials.filter(item => item.material_id === +id);
                this.setState({
                    material:material[0].description
                })
            }
            if(loggedIn && zip){this.setState({zip})}
    }

    handleInput =(value) =>{
        console.log('hello handleInput')
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
        if(name === 'map'){
            this.setState({displayMap:true,displayFullList:false,displayPrograms:false})
        }else if(name === 'list'){
            this.setState({displayMap:false,displayFullList:true,displayPrograms:false})
        }else if(name === 'programs'){
            this.setState({displayMap:false,displayFullList:false,displayPrograms:true})
        }
    }

     handleInputFocus = input => {
         console.log('hi from outside')
         this.setState({inputRef:input})
       console.log(input)
       return ()=>{
           console.log('hi from inside')
           console.log(input)
            if (input) {
                console.log('hi from way inside')
             setTimeout(() => {input.focus()}, 100);
           }
        }
    };

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

    render() {
        let {location} = this.props.user;
        const listId = MapId();
        let {
            locations,
            matMatchArr,
            zip,
            material,
            subHeadFlag,
            displayFullList,
            displayMap,
            displayPrograms
         } = this.state;
        let displaySubHead = subHeadFlag? 'inline' : 'none';
        let displayListClass = displayFullList ?'where-full-list-container':'where-maplist-container';
        let matTypeAhead =[];
        let listOfLocations = locations.map((place,index) => {
            if(displayFullList){
                return(
                    <div className="location-list-container" key={index} >
                        <FullListCard
                        location={place}
                        labelId={listId.getId()}
                        />
                    </div>
                )
            }else if(!displayFullList && displayMap){
                return(
                    <div className="location-list-container" key={index} >
                        <ListCard
                        location={place}
                        labelId={listId.getId()}
                        />
                    </div>
                )
            }

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
                    <QuickSearchBar
                    handleInputFocus={this.handleInputFocus}
                    handleInput={this.handleInput}
                    inputRef={this.state.inputRef}
                    />
                </div>
              <div className='where-search-bar' >
            <div className="where-header" >
                <h1>FIND A SOLUTION TO YOUR RECYCLING NEEDS</h1>
            </div>
                  <div className="search-materials">
                      <h6>ZIP CODE</h6>
                      <TextField
                        autoComplete="off"
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
                        inputRef={(input)=>this.handleInputFocus(input)}
                        id="outlined-name"
                        label="Plastic, Electronics, Aluminum, Etc..."
                        value={this.state.material}
                        onChange={(e)=>this.handleInput(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        />
                        <Button
                        variant="outlined"
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
                <div style={{display:displaySubHead}} >
                    <SubHeader
                    handleSwap={this.handleSwap}
                    searchCriteria={{zip,material}}
                    />
                </div>
                <div className="where-map-list-container">
                    <div
                    //Display list style depending on list or map view
                    className={displayListClass}
                    style={{display: displayMap || displayPrograms ? 'none':'inline'}}
                    >
                        {listOfLocations}
                    </div>
                    <div
                    className={displayListClass}
                    >
                       {listOfLocations}
                    </div>
                <div
                style={{display: displayFullList || displayPrograms?'none':'inline'}}
                className='map-container'>
                    <Map
                    location={location}
                    locations={locations}
                    />
                </div>
                <div
                style={{display:displayMap || displayFullList ? 'none':'inline'}}
                className='where-program-container'
                >
                    <Programs/>
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