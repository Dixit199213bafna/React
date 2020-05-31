import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Aux/Aux';
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/burgerBuilder" exact>Burger Builder</NavigationItem>
        {props.isAuth ? (<Aux>
                        <NavigationItem link="/orders">Orders</NavigationItem>
                        <NavigationItem link="/logout">Logout</NavigationItem></Aux>) : <NavigationItem link="/auth">Sign In</NavigationItem>}
    </ul>
)

export default navigationItems;