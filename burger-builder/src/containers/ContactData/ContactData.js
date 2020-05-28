import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Name'
                },
                value: ''
            },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [{
                            value: 'fastest',
                            displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }]
                    },
                    value: 'cheapest',
                }
        },
        loading: false,
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        })
        const formData = {};
        for(let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }
        const orderData = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            orderData: formData,
        }
        axios.post('/orders.json', orderData).then(res => {
            this.setState({
                loading: false,
            });
            this.props.history.push('/');
        }).catch(e => {
            this.setState({
                loading: false,
            });
    });
    }
    changeHandler = (event,element) => {
        console.log(event.target.value,element);
        const formData = {
            ...this.state.orderForm
        };
        const updatedFormElement = {...formData[element]};
        updatedFormElement.value = event.target.value;
        formData[element] = updatedFormElement;
        this.setState({
            orderForm: formData
        });
    }
    render() {
        const formElements = [];
        for(let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
          <form onSubmit={this.orderHandler}>
            {formElements.map((element, index) => <Input
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                changed={(event) => this.changeHandler(event, element.id)}/>)}
            <Button btnType="Success">Order</Button>
        </form>);
        if(this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData