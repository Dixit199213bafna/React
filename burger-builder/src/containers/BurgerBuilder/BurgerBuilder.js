import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Ordersumary/OrderSummar'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
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
            this.setState({
                ingredients: response.data,
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
        this.setState({
            purchasable: sum > 0
        })
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true,
        })
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const upadtedCount = oldCount + 1;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        const updatedIngredients = {
            ...this.state.ingredients,
            [type] : upadtedCount
        }
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(!oldCount){
            return;
        }
        const upadtedCount = oldCount - 1;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        const updatedIngredients = {
            ...this.state.ingredients,
            [type] : upadtedCount
        }
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice);
        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryParams.join('&')}`
        });
        // this.setState({
        //     loading: true,
        // });
        // const orderData = {
        //     ingredients: this.state.ingredients,
        //     totalPrice: this.state.totalPrice,
        //     customer: {
        //         name: 'Dixit',
        //         address: {
        //             street: 'Amsterdam',
        //             zipCode: 1234,
        //             country: 'NL'
        //         },
        //         email: 'abc@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.n', orderData).then(res => {
        //     this.setState({
        //         purchasing: false,
        //         loading: false,
        //     })
        // }).catch(e => {
        //     this.setState({
        //         purchasing: false,
        //         loading: false,
        //     })
        // });

    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredints Not laoded</p> : <Spinner/>;
        if(this.state.ingredients) {
            burger = (
                <Aux><Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ingredientAdded={this.addIngredientHandler.bind(this)}
                        ingredientRemoved={this.removeIngredientHandler.bind(this)}
                        disabled={disabledInfo}
                        ordered={this.purchaseHandler.bind(this)}/>
                </Aux>)
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                                         price={this.state.totalPrice}
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

export default  WithErrorHandler(BurgerBuilder, axios);