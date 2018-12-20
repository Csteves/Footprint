import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {passMaterialId} from '../../ducks/users';
import './Prices.css';




class Prices extends Component {
constructor(props) {
    super(props);
    this.state = {
        categories:[],
        show:false,

    }
}
    // i want to use a modal from material ui to render material.jsx
    showModal = (id)=>{
        this.props.passMaterialId(id);
        this.setState({show:true,})
    }
    hideModal = () =>{
        this.setState({show:false,showId:''})
    }

    async componentDidMount(){
        let res = await axios.get('/api/materials');
        console.log(res.data);
        this.setState({categories:res.data});
    }
    render() {
        let {categories} = this.state

        if(this.state.show){
            return(<Redirect to={`/prices${this.props.showId}`} />)
        }

        let sorted = categories.sort((a,b)=>a.id - b.id);
        let materials = sorted.map((category,index) => {
            const backgroundStyle = {
                backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${category.img_url})`,
            }
            let trending = category.price_change ?'trending_up' : "trending_down";
            let trendingStyle = category.price_change ? 'green' : 'red';
            //Steel based categories are based per ton
            let priceBase = 'lb' ;
            if(category.id === '10' || category.id === '11' || category.id === '12'){
                priceBase = 'kg'
            }
            return(
                <div key={category.id}>
                    <div
                    onClick={()=>this.showModal(category.id)}
                    style={backgroundStyle}
                    className='material-wrapper'>
                        <div>
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
            <div>
                <h1>prices</h1>
                <div className='materials-container'>
                    {materials}
                </div>

            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        showId:state.materialId
    }
}
export default connect(mapStateToProps,{passMaterialId})(Prices);