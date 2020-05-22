import React, { Component } from 'react';
// import styled from 'styled-components';
import classes from './Person.css';

// const StyledDiv = styled.div `
//    width: 60%;
//    margin: 16px auto;
//     border: 1px solid #eee;
//     box-shadow: 0 2px 3px #ccc;
//     text-align: center;
// `

class Person extends Component {
    constructor(props) {
        super(props);
        console.log('Person Constructor');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('Person shouldComponentUpdate');
        console.log(nextProps, nextState, nextContext);
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps, prevState, snapshot);
        console.log('Person componentDidUpdate');
    }

    componentDidMount() {
        console.log('Person componentDidMount');
    }

    componentWillUnmount() {
        console.log('Person Will Un Mount');
    }

    render () {
        console.log('Person Rendering');
        // const style = {
        //     backgroundColor: 'white',
        //     font: 'inherit',
        //     border: '1px solid blue',
        //     padding: '8px',
        //     cursor: 'pointer'
        // }
        return (
            <div className={classes.Person}>
                <p>I am {this.props.name} age is {this.props.age}</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.blur} value={this.props.name}/>
                <button className={classes.button}
                    onClick={this.props.click}>Delete</button>
            </div>
        )
    }
}

export default Person;