import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "../ContactData/ContactData";
import {Route} from "react-router-dom";
import { connect } from 'react-redux';
class Checkout extends Component {
    cancelOrderHandler = () => {
        this.props.history.goBack();
    }
    continueOrderHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
            <CheckoutSummary ingredients={this.props.ingredients}
                             cancelOrder={this.cancelOrderHandler.bind(this)}
                             continueOrder={this.continueOrderHandler.bind(this)}/>
            <Route path={this.props.match.path+'/contact-data'} component={ContactData}></Route>
            </div>
        )
    }
}

const mapsStateToProps = state => {
    return {
        ingredients: state.ingredients,
    }
}
export default connect(mapsStateToProps)(Checkout);