import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "../ContactData/ContactData";
import {Route, Redirect} from "react-router-dom";
import { connect } from 'react-redux';
class Checkout extends Component {
    cancelOrderHandler = () => {
        this.props.history.goBack();
    }
    continueOrderHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/"/>
        if(this.props.ingredients) {
            const purchasedRedirect = this.props.purchase ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ingredients}
                                 cancelOrder={this.cancelOrderHandler.bind(this)}
                                 continueOrder={this.continueOrderHandler.bind(this)}/>
                    <Route path={this.props.match.path+'/contact-data'} component={ContactData}></Route>
                </div>
            )
        }
        return summary
    }
}

const mapsStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchase: state.order.purchase,
    }
}
export default connect(mapsStateToProps)(Checkout);