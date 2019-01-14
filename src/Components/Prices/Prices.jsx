import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {passMaterialId} from '../../ducks/materials';
import './Prices.css';




class Prices extends Component {
constructor(props) {
    super(props);
    this.state = {
        categories:[],
    }
}

    showMaterial = (id)=>{
        this.props.history.push(`/prices${id}`)
    }

    async componentDidMount(){
        let res = await axios.get('/api/materials');
        this.setState({categories:res.data});

    }
    render() {
        let {categories} = this.state;

        let sorted = categories.sort((a,b)=>a.id - b.id);
        let materials = sorted.map((category,index) => {
            const backgroundStyle = {
                backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${category.img_url})`,
            }
            let trending = category.price_change ?'trending_up' : "trending_down";
            let trendingStyle = category.price_change ? 'green' : 'red';
            //Steel based categories are price based per ton
            let priceBase = 'lb' ;
            if(category.id === 10 || category.id === 11 || category.id === 12){
                priceBase = 't'
            }

            return(
                <div key={category.id}>
                    <div
                    onClick={()=>this.showMaterial(category.id)}
                    style={backgroundStyle}
                    className='material-wrapper'>
                        <div className="prices-card-content">
                        <h2>{category.title}</h2>
                        <h5>Current Market Price: ${category.price}/{priceBase}</h5>
                        <i
                        className={`material-icons ${trendingStyle}`}
                        >{trending}</i>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className="prices-main-container">
                <div className="prices-title-wrapper">
                    <h1>CURRENT MARKET PRICES FOR COMMON SCRAP METALS</h1>
                </div>
            <div className='materials-container'>
                    {materials}
                </div>
        </div>
        );
    }
}
function mapStateToProps(state){
    return{
        showId:state.materials.materialId
    }
}
export default connect(mapStateToProps,{passMaterialId})(Prices);