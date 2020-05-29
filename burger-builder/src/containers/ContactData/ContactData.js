import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                    },
                    valid: false,
                    touched: false,
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
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
                    valid: true,
                }
        },
        formIsValid: false,
        loading: false,
    }

    checkValid(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
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
        updatedFormElement.valid = updatedFormElement.validation ? this.checkValid(updatedFormElement.value, updatedFormElement.validation) : updatedFormElement.valid;
        updatedFormElement.touched = true;
        formData[element] = updatedFormElement;
        console.log(updatedFormElement);

        let formIsValid = true;
        for(let element in formData){
            formIsValid = formData[element].valid && formIsValid;
        }
        this.setState({
            orderForm: formData,
            formIsValid: formIsValid
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
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                changed={(event) => this.changeHandler(event, element.id)}
            />)}
            <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
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
 const mapsStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice,
     }
 }
export default connect(mapsStateToProps)(ContactData)