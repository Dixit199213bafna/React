import React from 'react';
import BurgerIngredient from './BurgerInredient/BurgerIngrdient';
import classes from './Burger.css';
import { withRouter } from 'react-router-dom';
const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
            .map(igKey => {
                return [...Array(props.ingredients[igKey])].map((_, index) =>
                    <BurgerIngredient key={igKey + index} type={igKey}></BurgerIngredient>);
            }).reduce((arr, el) => {
                return arr.concat(el);
            }, []);
   if(transformedIngredients.length === 0) {
       transformedIngredients = <p>Please Add Ingredients</p>
   }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    )
}

export default withRouter(burger);