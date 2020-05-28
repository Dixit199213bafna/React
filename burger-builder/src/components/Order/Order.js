import React from 'react';
import classes from './Order.css';
const order = (props) => {
    debugger;
    return (
        <div className={classes.Order}>
            <p>Ingredients:</p>
            {props.ingredients ? Object.keys(props.ingredients).map((igKey, index) => {
                return (
                    <li key={index}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                    </li>
                )
            }) : ''}
            <p>Price: {props.price}</p>
        </div>
    )
}

export default order;