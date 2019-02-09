import React, { Component } from 'react';
import './How.css';
import { connect } from 'react-redux';
import { getMaterials, getFamilies } from '../../ducks/materials';
import FamilyCard from '../Howcards/FamiliyCard';


class How extends Component {

    render() {
        let { families, materials } = this.props.state;
        let items = []
        if (families.length && materials.length) {
            items = families.map((family, index) => {
                let name = family.description
                let matCopy = [];
                if (family.material_ids) {
                    matCopy = materials.filter(mat => family.material_ids.includes(mat.material_id))
                }
                return (
                    <div
                        className='family-wrapper'
                        key={index} >
                        <FamilyCard
                            goToMaterial={this.goToMaterial}
                            familyItems={matCopy}
                            title={name}
                            famId={family.family_id}
                        />
                        <br />
                    </div>
                )
            })
        }
        return (
            <div className='how-main-container'>
                <div className="how-header" >
                    <h1>FIND THE MATERIALS YOU ARE TRYING TO RECYCLE</h1>
                </div>
                <div className="how-body">
                    {items}
                </div>

            </div>

        );
    }
}
function mapStateToProps(state) {
    return { state: state.materials }
}
export default connect(mapStateToProps, { getMaterials, getFamilies })(How);