import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from 'react-redux';
import * as actions from './store/action/index';
class App extends Component {
    componentDidMount() {
        console.log('App Mounted')
        this.props.onLoadSignUp();
    }

    render() {
    return (
      <div>
        <Layout>
            <Switch>
                ${this.props.isAuth ? <Route path="/checkout" component={Checkout}></Route> : ''}
                ${this.props.isAuth ? <Route path="/orders" component={Orders}></Route> : ''}
                <Route path="/auth" component={Auth}></Route>
                <Route path="/burgerBuilder" component={BurgerBuilder}></Route>
                ${this.props.isAuth ? <Route path="/logout" component={Logout}></Route> : ''}
                <Redirect from="/" to="/burgerBuilder"></Redirect>

                {/*<Route path="/" exact component={BurgerBuilder}></Route>*/}
            </Switch>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLoadSignUp: () => dispatch(actions.authCheckState())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
