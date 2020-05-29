import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={() => this.props.onAddValue(Math.ceil(Math.random()*10))}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubValue(Math.ceil(Math.random()*10))}  />
                <div>
                    <button onClick={this.props.onStoreResult}>Store Results</button>
                    <ul>
                        {this.props.results.map((result, index) => <li onClick={() => this.props.onDeleteResultL(index)} key={index}>{result}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.counter,
        results: state.results,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
        onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
        onAddValue: (value) => {
            dispatch({type: 'ADD', value})
        },
        onSubValue: (value) => dispatch({type: 'SUB', value}),
        onStoreResult: () => dispatch({type: 'STORE_RESULT'}),
        onDeleteResultL: (index) => dispatch({type: 'DELTE_RESULT', index})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);