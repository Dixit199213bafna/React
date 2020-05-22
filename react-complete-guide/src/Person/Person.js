import React, { Component } from 'react';
import styled from 'styled-components';
import './Person.css';

const StyledDiv = styled.div `
   width: 60%;
   margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    text-align: center;
`

class Person extends Component {
    render () {
        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        }
        return (
            <div className="Person">
                <p>I am {this.props.name} age is {this.props.age}</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.blur} value={this.props.name}/>
                <button className="button"
                    onClick={this.props.click}>Delete</button>
            </div>
        )
    }
}

export default Person;