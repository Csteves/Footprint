import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux'

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 175,
        width: '10vw',

    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class QuickSearchSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matNames: [],
            labelWidth: 0
        }
    }
    componentDidMount() {
        const { family } = this.props;
        const { materials } = this.props.state;
        let matArr = materials.filter(mat => family.material_ids.includes(mat.material_id));
        this.setState({ matNames: matArr })
    }


    handleInput = (e) => {
        this.props.handleInput(e.target.value);
        let focused = this.props.handleInputFocus(this.props.inputRef);
        focused();
    }
    render() {
        const { matNames } = this.state;
        const { classes, family } = this.props;
        let mat = matNames.map((mat, i) => {
            return (
                <MenuItem
                    key={i}
                    value={mat.description}
                >{mat.description}</MenuItem>
            )
        })
        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="quick-search-select">{family.description}</InputLabel>
                <Select
                    value=''
                    autoWidth={true}
                    onChange={this.handleInput}
                    inputProps={{
                        name: 'matName',
                        id: 'quick-search-select',
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {mat}
                </Select>
            </FormControl>
        );
    }
}
QuickSearchSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapState(state) {
    return { state: state.materials }
}

export default connect(mapState)(withStyles(styles)(QuickSearchSelect));