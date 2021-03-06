import React from 'react';
import classes from './BuildControls.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl'
const controls = [
    {
        label: 'Salad',
        type: 'salad'
    },
    {
        label: 'Bacon',
        type: 'bacon'
    },
    {
        label: 'Cheese',
        type: 'cheese'
    },
    {
        label: 'Meat',
        type: 'meat'
    }
]
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(control => <BuildControl key={control.label} label={control.label}
         added={() => props.ingredientAdded(control.type)}
         removed={() => props.ingredientRemoved(control.type)}
         disabled={props.disabled[control.type]}></BuildControl>)}
         <button disabled={!props.purchasable} className={classes.OrderButton} onClick={props.ordered}>{props.isAuth ? 'Order Now' : 'Sign Up to Order'}</button>
    </div>
)

export default buildControls;