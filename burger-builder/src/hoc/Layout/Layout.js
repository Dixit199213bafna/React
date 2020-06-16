import React, { Component } from 'react';
import Aux from '../Aux/Aux1';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
class Layout extends Component {
    state = {
        showSideDrawer: false,
    }
    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false,
        })
    }
    toggleMenu = () => {
        this.setState(prevState => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }
    render() {
        return (
            <Aux>
                <Toolbar toggleMenu={this.toggleMenu} isAuth={this.props.isAuth}/>
                <SideDrawer  open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} isAuth={this.props.isAuth}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);
