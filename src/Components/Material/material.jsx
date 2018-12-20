import React, { Component } from 'react';
import axios from 'axios';

class material extends Component {
    constructor(props) {
        super(props);
        this.state = {
            material:{}
        }
    }
    //look into material ui to use a card to disply info
   async componentDidMount(){
        let {id} = this.props.match.params;
        console.log(id)
        let res = await axios.get(`/api/material?id=${id}`);
        console.log(res.data);
        this.setState({material:res.data});
    }
    render() {
        let {material} = this.state
        console.log('state',this.state)
        let priceBase = 'lb' ;
            if(material.id === '10' || material.id === '11' || material.id === '12'){
                priceBase = 'kg'
            }
        let trending = material.price_change ?'trending_up' : "trending_down";
        let trendingStyle = material.price_change ? 'green' : 'red';
        return (
            <div>

                <h1>{material.title}</h1>
                <div>
                    <img src={material.img_url} alt=""/>
                </div>
                    <h3>${material.price}/{priceBase}
                    <i className={`material-icons ${trendingStyle}`} >{trending}</i>
                    <p>{material.content}</p>
                </h3>
            </div>
        );
    }
}

export default material;