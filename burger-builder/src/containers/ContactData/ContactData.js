import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: 'Dixit',
        address: {
            street: 'Amsterdam',
            zipCode: 1234,
            country: 'NL'
        },
        email: 'abc@gmail.com',
        loading: false,
    }
    orderHandler = (event) => {
        this.setState({
            loading: true,
        })
        event.preventDefault();
        const orderData = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            customer: {
                name: 'Dixit',
                address: {
                    street: 'Amsterdam',
                    zipCode: 1234,
                    country: 'NL'
                },
                email: 'abc@gmail.com'
            },
            deliveryMethod: 'fastest'
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
    render() {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" defaultValue={this.state.name} placeholder="Enter You Name"/>
            <input className={classes.Input} type="email" name="email" defaultValue={this.state.email} placeholder="Enter You Email"/>
            <input className={classes.Input} type="text" name="street" defaultValue={this.state.address.street} placeholder="Enter You Street"/>
            <input className={classes.Input} type="text" name="country" defaultValue={this.state.address.country} placeholder="Enter You Country"/>
            <input className={classes.Input} type="text" name="zipCode" defaultValue={this.state.address.zipCode} placeholder="Enter You zipCode"/>
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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