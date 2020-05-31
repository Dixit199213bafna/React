import React , { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/action/index';
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux/Aux";
import { Redirect } from 'react-router-dom';
class Auth extends Component {
    state = {
        controls : {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
        signUp: true,
        formIsValid: false,
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.setRedirectPath();
        }
    }

    switchAuthModelHandler = () => {
        this.setState({
            signUp: !this.state.signUp
        })
    }
    changeHandler(event, element) {
        const formData = {
            ...this.state.controls,
        }
        const updatedFormElement = {...formData[element]}
        updatedFormElement.value  = event.target.value;
        updatedFormElement.valid = updatedFormElement.validation ? this.checkValid(updatedFormElement.value, updatedFormElement.validation) : updatedFormElement.valid;
        updatedFormElement.touched = true;
        formData[element] = updatedFormElement;
        let formIsValid = true;
        for(let element in formData){
            formIsValid = formData[element].valid && formIsValid;
        }
        this.setState({
            controls: formData,
            formIsValid: formIsValid
        });
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
    onSignUpSuccess = (event) => {
        event.preventDefault();
        this.props.auth(this.state.controls.email.value, this.state.controls.password.value, this.state.signUp);
    }
    render() {
        const formElements = [];
        for(let key in this.state.controls){
            formElements.push({
                id: key,
                config: this.state.controls[key],
            })
        }
        let form = (
            <Aux><form onSubmit={this.onSignUpSuccess}>
                {formElements.map((element) => <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    invalid={!element.config.valid}
                    shouldValidate={element.config.validation}
                    touched={element.config.touched}
                    changed={(event) => this.changeHandler(event, element.id)}
                />)}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
            </form>
            <Button btnType="Danger" clicked={this.switchAuthModelHandler}>Switch to {this.state.signUp ? 'Sign In' : 'Sign Up'}</Button>
            </Aux>
        )
        if(this.props.loading) {
            form =(<Spinner/>)
        }

        let errorMessage = null
        if(this.props.error) {
            errorMessage = (
                <p className={classes.Error}>{this.props.error.message}</p>
            )
        }
        return (
            <div className={classes.Auth}>
                {errorMessage}
                {form}
                {this.props.isAuth ? <Redirect to={this.props.authRedirectPath}/> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        auth : (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        setRedirectPath: (path) => dispatch(actions.setAuthRedirect("/"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);