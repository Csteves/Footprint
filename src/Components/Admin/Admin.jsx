import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state ={
            bare_bright:'',
            num_one_copper:'',
            thhn_wire:'',
            ins_copper_wire:'',
            brass:'',
            alum_cans:'',
            sheet_alum:'',
            cast_alum:'',
            alum_break:'',
            light_iron:'',
            heavy_iron:'',
            vehicles:'',
            stainless_steel:'',
            soft_lead:'',
            batteries:''
        }
    }
    componentDidMount(){
        console.log(this.props.state)
    }
    // for materials with prices based on per ton, add per ton during the map of materials
    async updatePrice(name){
        let newPrice = this.state[name]
        let regex = /[a-zA-Z]/g;
        if(newPrice === ''){
           return alert('Please enter a quantity')
        }else if(newPrice.match(regex)){
           return alert('Please enter a valid price')
        }else{
           let res = await axios.put('/api/prices',{newPrice,name});
           console.log(res.data)
        }

    }
    render() {
        let {isAdmin} = this.props.state
        if(!isAdmin){
            return <Redirect to='/' />
        }
        return (
            <div>
                <div>
                    <div>
                        <p>#1 Bare Bright Copper Wire</p>
                        <input
                        onChange={(e)=>this.setState({bare_bright:e.target.value})}
                        type="text"/>
                        <button
                        name='bare_bright'
                        onClick={() => this.updatePrice('bare_bright')}
                        >
                        Update Price
                        </button>
                    </div>
                    <div>
                        <p>#1 copper</p>
                        <input
                        onChange={(e)=>this.setState({num_one_copper:e.target.value})}
                        type="text"/>
                        <button
                        name='num_one_copper'
                        onClick={() => this.updatePrice('num_one_copper')}
                        >
                        Update Price
                        </button>
                    </div>
                    <div>
                        <p>THHN Copper Wire</p>
                        <input
                        onChange={(e)=>this.setState({thhn_wire:e.target.value})}
                        type="text"/>
                        <button
                        onClick={() => this.updatePrice('thhn_wire')}
                        >
                        Update Price
                        </button>
                    </div>
                    <div>
                        <p>Insulated Copper Wire</p>
                        <input
                        onChange={(e)=>this.setState({ins_copper_wire:e.target.value})}
                        type="text"/>
                        <button
                        onClick={() => this.updatePrice('ins_copper_wire')}
                        >
                        Update Price
                        </button>
                    </div>
                    <div>
                        <p>Brass</p>
                        <input
                        onChange={(e)=>this.setState({brass:e.target.value})}
                        type="text"/>
                        <button
                        onClick={() => this.updatePrice('brass')}
                        >
                        Update Price
                        </button>
                    </div>
                    <div>
                        <p>Aluminum Cans</p>
                        <input
                        onChange={(e)=>this.setState({alum_cans:e.target.value})}
                        type="text"/>
                        <button
                        onClick={() => this.updatePrice('alum_cans')}
                        >
                        Update Price
                        </button>
                    </div>
                    <div>
                        <p>Sheet Aluminum</p>
                        <input
                        onChange={(e)=>this.setState({sheet_alum:e.target.value})}
                        type="text"/>
                        <button
                        onClick={() => this.updatePrice('sheet_alum')}
                        >
                        Update Price
                        </button>
                    </div>
                    <div>
                        <p>Cast Aluminum</p>
                        <input
                        onChange={(e)=>this.setState({cast_alum:e.target.value})}
                        type="text"/>
                        <button
                        onClick={() => this.updatePrice('cast_alum')}
                        >
                        Update Price
                        </button>
                    </div>
                    <div>
                        <p>Aluminum Breakage</p>
                        <input
                        onChange={(e)=>this.setState({alum_break:e.target.value})}
                        type="text"/>
                        <button
                        onClick={() => this.updatePrice('alum_break')}
                        >
                        Update Price
                        </button>
                    </div>
                    <div>
                        <p>Light Iron</p>
                        <input
                        onChange={(e)=>this.setState({light_iron:e.target.value})}
                        type="text"/>
                        <button
                        onClick={() => this.updatePrice('light_iron')}
                        >
                        Update Price
                        </button>
                    </div>
                    <div>
                        <p>#1 Heavy Iron</p>
                        <input
                        onChange={(e)=>this.setState({heavy_iron:e.target.value})}
                        type="text"/>
                        <button
                        onClick={() => this.updatePrice('heavy_iron')}
                        >
                        Update Price
                        </button>
                    </div>
                    <div>
                        <p>Vehicles</p>
                        <input
                        onChange={(e)=>this.setState({vehicles:e.target.value})}
                        type="text"/>
                        <button
                        onClick={() => this.updatePrice('vehicles')}
                        >
                        Update Price
                        </button>
                    </div>
                    <div>
                        <p>Stainless Steel</p>
                        <input
                        onChange={(e)=>this.setState({stain_steel:e.target.value})}
                        type="text"/>
                        <button
                        onClick={() => this.updatePrice('stain_steel')}
                        >
                        Update Price
                        </button>
                    </div>
                    <div>
                        <p>Lead</p>
                        <input
                        onChange={(e)=>this.setState({lead:e.target.value})}
                        type="text"/>
                        <button
                        onClick={() => this.updatePrice('lead')}
                        >
                        Update Price
                        </button>
                    </div>
                    <div>
                        <p>Batteries</p>
                        <input
                        onChange={(e)=>this.setState({batteries:e.target.value})}
                        type="text"/>
                        <button
                        onClick={() => this.updatePrice('batteries')}
                        >
                        Update Price
                        </button>
                    </div>

                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{state:state.users}
}
export default connect(mapStateToProps)(Admin);