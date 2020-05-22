import React, { Component } from 'react';
import Person from "./Person/Person";
import './App.css';
import styled from 'styled-components';


const StyledBtn = styled.button `
    background-color: ${props => props.alt ? 'red': 'white'};
    font: inherit;
    border: 1px solid blue;
    padding: 8px;
    cursor: pointer;
    
    &:hover {
        background-color: ${props => props.alt ? 'orange': 'grey'};
        color: black;
    }
`;

class App extends Component {
  state = {
      persons: [
          {
              name: 'Max',
              age: 21
          },
          {
              name: 'Manu',
              age: 25
          }
      ],
      showData: false,
  }

  changeName = (name, index) => {
      const person = {...this.state.persons[index]}
      person.name = name;
      const persons  = [...this.state.persons];
      persons[index] = person;
      this.setState({persons});
  }

    changeNameOnBlur = (index, event) => {
      debugger;
      this.changeName(event.target.value, index)
    }

    showData = () => {
      this.setState({showData: !this.state.showData});
    }

    deleteHandler = (index) => {
      const persons = [...this.state.persons];
      persons.splice(index, 1);
      this.setState({persons});
    }
  render() {
    let persons = null;
    if(this.state.showData) {
        persons = (
            this.state.persons.map((person, index) => <Person
                click={() => this.deleteHandler(index)}
                key={index} name={person.name} age={person.age}
                blur={this.changeNameOnBlur.bind(this, index)}/>)
        )

        // style.backgroundColor = 'red';
        // style[':hover'] = {
        //     backgroundColor: 'lightred',
        //     color: 'blue'
        // }


    }

    return (
      <div className="App">
          <h1>I am Developer</h1>
          {persons}
          <button className="button" alt={this.state.showData}
              onClick={this.showData}>Toggle Data</button>
      </div>
    );
  }
}
//HOC - Adding extra feature to components
export default App;
