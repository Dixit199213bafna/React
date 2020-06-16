import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux1';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Ordersumary/OrderSummar'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/action/index';

export class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
    }

    componentDidMount() {
       this.props.getIngredients();
    }

    updatePurchaseState(updatedIngredients) {
        const ingredients  = {
            ...updatedIngredients
        }
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((previousValue, currentValue) => previousValue+currentValue, 0);
        return sum > 0
    }

    purchaseHandler = () => {
        if(this.props.isAuth) {
            this.setState({
                purchasing: true,
            })
        } else {
            this.props.onSetRedirectPath("/checkout")
            this.props.history.push('/auth');
        }

    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = (event) => {
        event.preventDefault();
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    
    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredints Not laoded</p> : <Spinner/>;
        if(this.props.ings) {
            burger = (
                <Aux><Burger ingredients={this.props.ings}></Burger>
                    <BuildControls
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ingredientAdded={this.props.onIngrdientAdd}
                        ingredientRemoved={this.props.onIngrdientRemove}
                        disabled={disabledInfo}
                        isAuth={this.props.isAuth}
                        ordered={this.purchaseHandler.bind(this)}/>
                </Aux>)
            orderSummary = <OrderSummary ingredients={this.props.ings}
                                         price={this.props.price}
                                         cancelOrder={this.purchaseCancelHandler.bind(this)}
                                         continueOrder={this.purchaseContinueHandler.bind(this)}/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler.bind(this)}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getIngredients: () => dispatch(burgerBuilderActions.fetchIngredients()),
        onIngrdientAdd: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngrdientRemove: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirect(path))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
