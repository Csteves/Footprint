import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { getGeoKey } from '../../config';
import { getPrograms } from '../../ducks/materials';
import axios from 'axios';
import './Where.css'
class SubHeader extends Component {

    async componentDidMount() {
        const { zip, getPrograms } = this.props
        const { location, loggedIn } = this.props.state.users;
        const { proLoading, matLoading, famLoading } = this.props.state.materials
        if (!proLoading && !matLoading && !famLoading) {
            if (loggedIn) {
                let userHasLocation = Object.keys(location).length;
                if (userHasLocation) {
                    getPrograms(location)
                }
            } else if (zip) {
                let geoLocation = this.getGeo(zip);
                if (Object.keys(geoLocation).length) {
                    getPrograms(geoLocation)
                }
            } else {
                let defaultZip = '67446'
                let geoLocation = await this.getGeo(defaultZip);
                if (Object.keys(geoLocation).length) {
                    getPrograms(geoLocation)
                }
            }
        }
    }

    getGeo = async (zip) => {
        let res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${getGeoKey()}`)
        let { location } = res.data.results[0].geometry;
        if (Object.keys(location).length) {
            return location
        }
    }

    render() {
        const { zip, material, } = this.props.searchCriteria;
        return (
            <div className='where-sub-container'>
                <div className='where-sub-head' >
                    <h3>Locations accepting
                    <em
                            style={{ fontStyle: 'italic' }}
                        > {material} </em>
                        in proxitmity of
                     <em
                            style={{ fontStyle: 'italic' }}
                        > {zip}</em></h3>
                </div>
                <div className='where-sub-btns'>
                    <Button
                        variant="outlined"
                        color="primary"
                        id="where-search-btn"
                        onClick={() => this.props.handleSwap("map")}
                        size='large'
                    >
                        MAP VIEW
                </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        id="where-search-btn"
                        onClick={() => this.props.handleSwap('list')}
                        size='large'
                    >
                        ALL LISTINGS
                </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        id="where-search-btn"
                        onClick={() => this.props.handleSwap('programs')}
                        size='large'
                    >
                        PROGRAMS
                </Button>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return { state: state }
}
export default connect(mapStateToProps, { getPrograms })(SubHeader);


