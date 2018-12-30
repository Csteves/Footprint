import React, { Component } from 'react';
import './How.css';
import {connect} from 'react-redux';
import {getMaterials,getFamilies} from '../../ducks/materials';
import FamilyCard from '../Howcards/FamiliyCard';


class How extends Component {
    constructor(props) {
        super(props);
        // this.goToMaterial = this.goToMaterial.bind(this)
    }

    async componentDidMount(){
    //  await this.props.getMaterials();
    //  await this.props.getFamilies();
    //  console.log(this.props);
    }
    // goToMaterial(id){
    //     this.props.history.push(`/material${id}`);
    // }
    render() {
        let{families,materials} = this.props.state;
        let items = []
        if(families.length && materials.length){
            items = families.map((family,index) => {
                let name = family.description
                let matCopy= [];
                if(family.material_ids){
                 materials.forEach((mat) =>{
                     let found = false
                    family.material_ids.filter((id) =>{
                        if(!found && mat.material_id === id){
                            // console.log("mat.id",mat.material_id,"famId",id)
                           matCopy.push(mat);
                            found = true;
                            return false
                        }else{
                            return true
                        }
                    })
                })

                }
                 return(
                    <div
                    className='family-wrapper'
                    key={index} >
                        <FamilyCard
                        goToMaterial={this.goToMaterial}
                        familyItems={matCopy}
                        title={name}
                        />
                        <br/>
                    </div>
                )
            })
        }
        return (
            <div className='how-main-container'>
                {items}
            </div>
        );
    }
}
function mapStateToProps(state){
    return{state:state.materials}
}
export default connect(mapStateToProps,{getMaterials,getFamilies})(How);