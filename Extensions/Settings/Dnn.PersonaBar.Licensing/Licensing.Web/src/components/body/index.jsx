import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import PersonaBarPageBody from "dnn-persona-bar-page-body";
import {
    pagination as PaginationActions,
    licensing as LicensingActions
} from "../../actions";
import Platform from "../platform";
import "./style.less";

export class Body extends Component {
    constructor() {
        super();
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(index) {
        const {props} = this;
        props.dispatch(PaginationActions.loadTab(index));   //index acts as scopeTypeId
    }

    componentWillMount() {
        const {props} = this;
        props.dispatch(LicensingActions.getProduct());
    }

    /*eslint no-mixed-spaces-and-tabs: "error"*/
    render() {
        return (
            <PersonaBarPageBody>
                {this.props.productName === "DNNCORP.CE" &&
                    <Platform />
                }
            </PersonaBarPageBody>
        );
    }
}

Body.propTypes = {
    dispatch: PropTypes.func.isRequired,
    tabIndex: PropTypes.number,
    productName: PropTypes.string
};

function mapStateToProps(state) {
    return {
        tabIndex: state.pagination.index,
        productName: state.licensing.productName
    };
}

export default connect(mapStateToProps)(Body);