import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {handleOpen} from '../../ducks/users';
import EmailForm from './EmailForm'
import './Admin.css'

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
            stain_steel:'',
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
           this.props.handleOpen(res.data.message)
           this.setState({[name]:''})
        }

    }
    render() {
        let {isAdmin} = this.props.state
        if(!isAdmin){
            return <Redirect to='/' />
        }
        return (
            <div id="admin">
                    <EmailForm/>
                <div className='admin-container'>
                    <div className="update-wrap">
                        <p>#1 Bare Bright Copper Wire</p>
                        <TextField
                        fullWidth
                        autoComplete="off"
                        id="outlined-name"
                        label="Enter current price"
                        margin="normal"
                        variant="outlined"
                        value={this.state.bare_bright}
                        onChange={(e)=>this.setState({bare_bright:e.target.value})}
                        type="text"/>
                        <Button
                        color="primary"
                        variant="outlined"
                        size='large'
                        name='bare_bright'
                        onClick={() => this.updatePrice('bare_bright')}
                        >
                        Update Price
                        </Button>
                    </div>
                    <div className="update-wrap">
                        <p>#1 copper</p>
                        <TextField
                        fullWidth
                        autoComplete="off"
                        id="outlined-name"
                        label="Enter current price"
                        margin="normal"
                        variant="outlined"
                        value={this.state.num_one_copper}
                        onChange={(e)=>this.setState({num_one_copper:e.target.value})}
                        type="text"/>
                        <Button
                        color="primary"
                        variant="outlined"
                        size='large'
                        name='num_one_copper'
                        onClick={() => this.updatePrice('num_one_copper')}
                        >
                        Update Price
                        </Button>
                    </div>
                    <div className="update-wrap">
                        <p>THHN Copper Wire</p>
                        <TextField
                        fullWidth
                        autoComplete="off"
                        id="outlined-name"
                        label="Enter current price"
                        margin="normal"
                        variant="outlined"
                        value={this.state.thhn_wire}
                        onChange={(e)=>this.setState({thhn_wire:e.target.value})}
                        type="text"/>
                        <Button
                        color="primary"
                        variant="outlined"
                        size='large'
                        onClick={() => this.updatePrice('thhn_wire')}
                        >
                        Update Price
                        </Button>
                    </div>
                    <div className="update-wrap">
                        <p>Insulated Copper Wire</p>
                        <TextField
                        fullWidth
                        autoComplete="off"
                        id="outlined-name"
                        label="Enter current price"
                        margin="normal"
                        variant="outlined"
                        value={this.state.ins_copper_wire}
                        onChange={(e)=>this.setState({ins_copper_wire:e.target.value})}
                        type="text"/>
                        <Button
                        color="primary"
                        variant="outlined"
                        size='large'
                        onClick={() => this.updatePrice('ins_copper_wire')}
                        >
                        Update Price
                        </Button>
                    </div>
                    <div className="update-wrap">
                        <p>Brass</p>
                        <TextField
                        fullWidth
                        autoComplete="off"
                        id="outlined-name"
                        label="Enter current price"
                        margin="normal"
                        variant="outlined"
                        value={this.state.brass}
                        onChange={(e)=>this.setState({brass:e.target.value})}
                        type="text"/>
                        <Button
                        color="primary"
                        variant="outlined"
                        size='large'
                        onClick={() => this.updatePrice('brass')}
                        >
                        Update Price
                        </Button>
                    </div>
                    <div className="update-wrap">
                        <p>Aluminum Cans</p>
                        <TextField
                        fullWidth
                        autoComplete="off"
                        id="outlined-name"
                        label="Enter current price"
                        margin="normal"
                        variant="outlined"
                        value={this.state.alum_cans}
                        onChange={(e)=>this.setState({alum_cans:e.target.value})}
                        type="text"/>
                        <Button
                        color="primary"
                        variant="outlined"
                        size='large'
                        onClick={() => this.updatePrice('alum_cans')}
                        >
                        Update Price
                        </Button>
                    </div>
                    <div className="update-wrap">
                        <p>Sheet Aluminum</p>
                        <TextField
                        fullWidth
                        autoComplete="off"
                        id="outlined-name"
                        label="Enter current price"
                        margin="normal"
                        variant="outlined"
                        value={this.state.sheet_alum}
                        onChange={(e)=>this.setState({sheet_alum:e.target.value})}
                        type="text"/>
                        <Button
                        color="primary"
                        variant="outlined"
                        size='large'
                        onClick={() => this.updatePrice('sheet_alum')}
                        >
                        Update Price
                        </Button>
                    </div>
                    <div className="update-wrap">
                        <p>Cast Aluminum</p>
                        <TextField
                        fullWidth
                        autoComplete="off"
                        id="outlined-name"
                        label="Enter current price"
                        margin="normal"
                        variant="outlined"
                        value={this.state.cast_alum}
                        onChange={(e)=>this.setState({cast_alum:e.target.value})}
                        type="text"/>
                        <Button
                        color="primary"
                        variant="outlined"
                        size='large'
                        onClick={() => this.updatePrice('cast_alum')}
                        >
                        Update Price
                        </Button>
                    </div>
                    <div className="update-wrap">
                        <p>Aluminum Breakage</p>
                        <TextField
                        fullWidth
                        autoComplete="off"
                        id="outlined-name"
                        label="Enter current price"
                        margin="normal"
                        variant="outlined"
                        value={this.state.alum_break}
                        onChange={(e)=>this.setState({alum_break:e.target.value})}
                        type="text"/>
                        <Button
                        color="primary"
                        variant="outlined"
                        size='large'
                        onClick={() => this.updatePrice('alum_break')}
                        >
                        Update Price
                        </Button>
                    </div>
                    <div className="update-wrap">
                        <p>Light Iron</p>
                        <TextField
                        fullWidth
                        autoComplete="off"
                        id="outlined-name"
                        label="Enter current price"
                        margin="normal"
                        variant="outlined"
                        value={this.state.light_iron}
                        onChange={(e)=>this.setState({light_iron:e.target.value})}
                        type="text"/>
                        <Button
                        color="primary"
                        variant="outlined"
                        size='large'
                        onClick={() => this.updatePrice('light_iron')}
                        >
                        Update Price
                        </Button>
                    </div>
                    <div className="update-wrap">
                        <p>#1 Heavy Iron</p>
                        <TextField
                        fullWidth
                        autoComplete="off"
                        id="outlined-name"
                        label="Enter current price"
                        margin="normal"
                        variant="outlined"
                        value={this.state.heavy_iron}
                        onChange={(e)=>this.setState({heavy_iron:e.target.value})}
                        type="text"/>
                        <Button
                        color="primary"
                        variant="outlined"
                        size='large'
                        onClick={() => this.updatePrice('heavy_iron')}
                        >
                        Update Price
                        </Button>
                    </div>
                    <div className="update-wrap">
                        <p>Vehicles</p>
                        <TextField
                        fullWidth
                        autoComplete="off"
                        id="outlined-name"
                        label="Enter current price"
                        margin="normal"
                        variant="outlined"
                        value={this.state.vehicles}
                        onChange={(e)=>this.setState({vehicles:e.target.value})}
                        type="text"/>
                        <Button
                        color="primary"
                        variant="outlined"
                        size='large'
                        onClick={() => this.updatePrice('vehicles')}
                        >
                        Update Price
                        </Button>
                    </div>
                    <div className="update-wrap">
                        <p>Stainless Steel</p>
                        <TextField
                        fullWidth
                        autoComplete="off"
                        id="outlined-name"
                        label="Enter current price"
                        margin="normal"
                        variant="outlined"
                        value={this.state.stain_steel}
                        onChange={(e)=>this.setState({stain_steel:e.target.value})}
                        type="text"/>
                        <Button
                        color="primary"
                        variant="outlined"
                        size='large'
                        onClick={() => this.updatePrice('stain_steel')}
                        >
                        Update Price
                        </Button>
                    </div>
                    <div className="update-wrap">
                        <p>Lead</p>
                        <TextField
                        fullWidth
                        autoComplete="off"
                        id="outlined-name"
                        label="Enter current price"
                        margin="normal"
                        variant="outlined"
                        value={this.state.soft_lead}
                        onChange={(e)=>this.setState({soft_lead:e.target.value})}
                        type="text"/>
                        <Button
                        color="primary"
                        variant="outlined"
                        size='large'
                        onClick={() => this.updatePrice('soft_lead')}
                        >
                        Update Price
                        </Button>
                    </div>
                    <div className="update-wrap">
                        <p>Batteries</p>
                        <TextField
                        fullWidth
                        autoComplete="off"
                        id="outlined-name"
                        label="Enter ZIP"
                        margin="normal"
                        variant="outlined"
                        value={this.state.batteries}
                        onChange={(e)=>this.setState({batteries:e.target.value})}
                        type="text"/>
                        <Button
                        color="primary"
                        variant="outlined"
                        size='large'
                        onClick={() => this.updatePrice('batteries')}
                        >
                        Update Price
                        </Button>
                    </div>

                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{state:state.users}
}
export default connect(mapStateToProps,{handleOpen})(Admin);