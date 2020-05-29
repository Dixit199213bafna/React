const initialState = {
    counter: 0,
    results: [],
}

const reducer = (state = initialState, action) => {
    let updatedState = {
        ...state
    }
    switch(action.type) {
        case ('INCREMENT') : updatedState = {
            ...updatedState,
            counter: updatedState.counter + 1,
        }
            break;
        case ('DECREMENT'): updatedState = {
            ...updatedState,
            counter: updatedState.counter - 1
        }
        break;
        case ('ADD'): updatedState = {
            ...updatedState,
            counter: updatedState.counter + action.value
        }
            break;
        case ('SUB'): updatedState = {
            ...updatedState,
            counter: updatedState.counter - action.value
        }
        break;
        case ('STORE_RESULT'): updatedState = {
            ...updatedState,
            results: updatedState.results.concat(updatedState.counter),
        }
        break;
        case ('DELTE_RESULT'):
            const newArray = [...updatedState.results];
            newArray.splice(action.index, 1);
            updatedState = {
            ...updatedState,
            results: newArray
        }
        break;
        default: return state;
    }
    return updatedState;
};

export default reducer;