import React, { Component } from 'react';
import axios from 'axios';
import './material.css'

class material extends Component {
    constructor(props) {
        super(props);
        this.state = {
            material: {}
        }
    }
    //look into material ui to use a card to disply info
    async componentDidMount() {
        let { id } = this.props.match.params;
        let res = await axios.get(`/api/material?id=${id}`);
        this.setState({ material: res.data });
    }
    async componentDidUpdate(prevProps) {
        let { id } = this.props.match.params
        if (prevProps.match.params.id !== id) {
            let res = await axios.get(`/api/material?id=${id}`);
            this.setState({ material: res.data });
        }
    }
    render() {
        let { material } = this.state
        let priceBase = 'lb';
        if (material.id === 10 || material.id === 11 || material.id === 12) {
            priceBase = 't'
        }
        let trending = material.price_change ? 'trending_up' : "trending_down";
        let trendingStyle = material.price_change ? 'green' : 'red';
        return (
            <div className="main-material-container">
                <div className='material-title'>
                    <h1>{material.title}</h1>
                </div>

                <div className="material-body-wrapper">
                    <div className='material-img-wrapper'>
                        <img src={material.img_url} alt="" />
                    </div>
                    <div className="material-content-head">
                        <h3>Current Market Price :${material.price}/{priceBase}
                        </h3>
                        <i className={`material-icons ${trendingStyle}`} >{trending}</i>
                    </div>
                    <p className='material-body-content'>
                        <h4>Recyling Information:</h4>
                        {material.content}</p>

                </div>
            </div>
        );
    }
}

export default material;