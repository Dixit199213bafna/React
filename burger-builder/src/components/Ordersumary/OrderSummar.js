import React, { Component } from  'react';
import Aux from '../../hoc/Aux/Aux1';
import Button from '../UI/Button/Button';
class OrderSummary extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Component Did Update');
        console.log(prevProps, prevState)
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((igKey, index) => {
            return (
                <li key={index}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            )
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A Delicious with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <strong>Your Price: ${this.props.price.toFixed(2)}</strong>
                <p>Contiune to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelOrder}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continueOrder}>CONTINUE</Button>
            </Aux>
        )
    }
};

export default OrderSummary;
