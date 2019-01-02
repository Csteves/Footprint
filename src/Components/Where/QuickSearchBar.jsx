import React, { Component } from 'react';
import {connect} from 'react-redux';
import QuickSearchSelect from '../WhereCards/QuickSearchSelect'
import './Where.css';



class QuickSearchBar extends Component {
    render() {

        const {families} =this.props.state;
        let family = families.map(fam =>{
            return(
                <div key={fam.family_id}>
                    <QuickSearchSelect
                    handleInput={this.props.handleInput}
                    handleInputFocus={this.props.handleInputFocus}
                    inputRef={this.props.inputRef}
                    family={fam}
                    />
                </div>
            )
        })
        return (
                <div className="quick-search-bar-container" >
                   <h1>QUICK SEARCH</h1>
                   <form className='quick-search-form' autoComplete="off">
                      {family}
                   </form>


                </div>
        );
    }
}


function mapStateToProps(state){
    return{state:state.materials}
}
export default connect(mapStateToProps)(QuickSearchBar);