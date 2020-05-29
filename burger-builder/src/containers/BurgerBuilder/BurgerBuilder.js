import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Ordersumary/OrderSummar'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })
        axios.get('/ingredients.json').then(response => {
            this.props.onIngridentSet(response.data)
            this.setState({
                error: false,
                loading: false,
            })
        }).catch(e => {
            this.setState({
                error: true,
                loading: false,
            })
        });
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
        this.setState({
            purchasing: true,
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
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
        let burger = this.state.error ? <p>Ingredints Not laoded</p> : <Spinner/>;
        if(this.props.ings) {
            burger = (
                <Aux><Burger ingredients={this.props.ings}></Burger>
                    <BuildControls
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ingredientAdded={this.props.onIngrdientAdd}
                        ingredientRemoved={this.props.onIngrdientRemove}
                        disabled={disabledInfo}
                        ordered={this.purchaseHandler.bind(this)}/>
                </Aux>)
            orderSummary = <OrderSummary ingredients={this.props.ings}
                                         price={this.props.price}
                                         cancelOrder={this.purchaseCancelHandler.bind(this)}
                                         continueOrder={this.purchaseContinueHandler.bind(this)}/>
            if(this.state.loading) {
                orderSummary = <Spinner />;
            }
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
        ings: state.ingredients,
        price: state.totalPrice,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngridentSet: (ingredients) => dispatch({ type:actionTypes.SET_INGREDIENTS, ingredients}),
        onIngrdientAdd: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName:ingName }),
        onIngrdientRemove: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName:ingName })
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));