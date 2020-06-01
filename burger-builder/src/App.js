import React, { Component, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
// import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from 'react-redux';
import * as actions from './store/action/index';

const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
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
                ${this.props.isAuth ? <Route path="/checkout" render={() => (
                    <Suspense fallback={<div>Loading....</div>}>
                        <Checkout/>
                    </Suspense>
            )}></Route> : ''}
                ${this.props.isAuth ? <Route path="/orders" render={() => (
                <Suspense fallback={<div>Loading....</div>}>
                    <Orders/>
                </Suspense>
            )}></Route> : ''}
                <Route path="/auth" component={Auth}></Route>
                <Route path="/burgerBuilder" component={BurgerBuilder}></Route>
                ${this.props.isAuth ? <Route path="/logout" component={Logout}></Route> : ''}
                <Redirect from="/" to="/burgerBuilder"></Redirect>
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
