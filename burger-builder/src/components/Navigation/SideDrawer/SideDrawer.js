import React from 'react'
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigtionItems';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Aux/Aux1';
const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </div>
        </Aux>
    );
};

export default sideDrawer;
