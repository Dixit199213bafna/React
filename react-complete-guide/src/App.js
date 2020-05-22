import React, { Component } from 'react';
import Person from "./Person/Person";
import classes from './App.css';
// import styled from 'styled-components';

class App extends Component {

  constructor(props) {
      super(props);
      console.log('App Js Constructor');
      this.state = {
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

  }

  static getDerivedStateFromProps(props, state) {
      console.log('App JS getDerivedStateFromProps', props);
      return state;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
      console.log(nextProps, nextState, nextContext);
      return true;
  }

    componentDidMount() {
      console.log('App Js componentDidMount');
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
      console.log('App Js Render');
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
      <div className={classes.App}>
          <h1>I am Developer</h1>
          {persons}
          <button className={classes.button}
              onClick={this.showData}>Toggle Data</button>
      </div>
    );
  }
}
//HOC - Adding extra feature to components
export default App;
