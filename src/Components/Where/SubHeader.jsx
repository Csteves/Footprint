import React from 'react';
import { Button } from '@material-ui/core';
import './Where.css'
export default function SubHeader(props) {
    const {zip,material} = props.searchCriteria
    const searchStr = `Locations accepting ${material} in proximity of ${zip}`;
        return (
            <div className='where-sub-container'>
                <div className='where-sub-head' >
                    <h3>Locations accepting
                        <em
                        style={{fontStyle:'italic'}}
                        > {material} </em>
                         in proxitmity of
                         <em
                         style={{fontStyle:'italic'}}
                         > {zip}</em></h3>
                </div>
                <div className='where-sub-btns'>
                    <Button
                     variant="outlined"
                     color="primary"
                     id="where-search-btn"
                     onClick={()=>props.handleSwap("map")}
                     size='large'
                    >
                    MAP VIEW
                    </Button>
                    <Button
                     variant="outlined"
                     color="primary"
                     id="where-search-btn"
                    //  onClick={this.handleSwap}
                     size='large'
                    >
                    ALL LISTINGS
                    </Button>
                    <Button
                     variant="outlined"
                     color="primary"
                     id="where-search-btn"
                    //  onClick={this.handleSwap}
                     size='large'
                    >
                    PROGRAMS
                    </Button>
                </div>
            </div>
        );
    }
