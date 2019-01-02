import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper,Marker,InfoWindow } from 'google-maps-react';
import { getMapKey } from '../../config';
import {connect} from 'react-redux';
import {updateLocations} from '../../ducks/users'
import Axios from 'axios';
import MapId from '../../mapId'
import './Map.css';



const mapStyles = {
  width: '100%',
  height: '100%',

};

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
             userLocation: props.state.location,
             showingInfoWindow: false,
             activeMarker: {},
             selectedPlace: {},
             locationDetails:{},
             distance:null
        }
    }
    componentDidMount(){
        this.setState({loading:false})
    }

    onMarkerClick = (props, marker, e) =>{
      console.log(marker)
      this.getLocationDetails(marker.name.id);
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        distance:marker.name.distance
      });
    }
    async getLocationDetails(location_id){
      let res = await Axios.get(`/api/locationDetails?location_id=${location_id}`);
      console.log(res.data)
      this.setState({locationDetails:res.data[location_id]})
    }

    onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
    };
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null,
        })
      }
    };
    onInfoWindowOpen(props, e) {
      if(this.props.state.loggedIn){
        const button = (
          <button
            onClick={e => {
              this.handleSave(this.state.locationDetails,this.state.distance)
            }}
          >
            Save This Location
          </button>
        );
        ReactDOM.render(
          React.Children.only(button),
          document.getElementById("info-window-save-btn")
        );
      }
    }

    handleSave = async (details,distance) => {
      let{id} = this.props.state
        console.log(details)
        let res = await Axios.post('/api/location',{details,id,distance});
        console.log(res.data)
        this.props.updateLocations(res.data.usersLocations)
     };
  render() {
    const mapId = MapId();
    const {loading,locationDetails} = this.state;
    const {location,loggedIn}= this.props.state;
    const{locations}= this.props
    console.log('map',locations)
    let userLocation = {};
    let saveLocation = loggedIn ? <div id='info-window-save-btn' ></div>
                                : null

    let details = locationDetails.description
                  ?
                  <div>
                    <h1>{locationDetails.description}</h1>
                    <p>{locationDetails.address}</p>
                    <p>
                       {`${locationDetails.city}, ${locationDetails.province}. ${locationDetails.postal_code}`}
                    </p>
                    <p>Phone: {locationDetails.phone}</p>
                    <p>Distance: {this.state.distance} Miles</p>
                  </div>
                  : <div>Loading...</div>
    if(!loading){
      userLocation = location.lat && location.lng ?location:{lat:39.4367,lng:-98.3546};
    }
    let map = loading ? 'Loading...'
                    :<Map
                    google={this.props.google}
                    style={mapStyles}
                    zoom={ !loading &&location.lat && location.lng?10:6}
                    initialCenter={userLocation}
                    center={userLocation}
                    onClick={this.onMapClicked}
                    >
                    {locations.map((place,index) =>
                             <Marker
                              key={index}
                              onClick={this.onMarkerClick}
                              title={place.description}
                              name={{id:place.location_id,distance:place.distance}}
                              label={{
                                text: mapId.getId(),
                                color: "rgb(241, 90, 34)",
                                fontSize: "18px",
                                fontWeight: "bold",

                              }}

                              icon={{
                                url:'/assets/place.svg',
                                size: new this.props.google.maps.Size(75,75),
                                scaledSize:  new this.props.google.maps.Size(65,65),
                                labelOrigin: new this.props.google.maps.Point(35,27),
                              }}
                              position={{
                                lat:place.latitude,
                                lng:place.longitude
                              }}
                            />
                    )}
                     <InfoWindow
                              marker={this.state.activeMarker}
                              visible={this.state.showingInfoWindow}
                              onClose={this.onClose}
                              onOpen={e => {
                                this.onInfoWindowOpen(this.props, e);
                              }}
                              >
                              <div>
                                {details}
                                {saveLocation}
                              </div>
                              </InfoWindow>
                  </Map>
    return (
      <div>
          {map}
      </div>

    );
  }
}
function mapStateToProps(state){
  return{state:state.users}
}
export default connect(mapStateToProps,{updateLocations})(GoogleApiWrapper({
  apiKey: getMapKey()
})(MapContainer));