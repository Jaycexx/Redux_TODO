import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/ActionTypes';

const initialState = { counter: 0 };

function increment() {
    return { counter: counter + 1 };
}

function decrement() {
    return { counter: counter - 1 };
}

export default function CounterStore(state, action) {
    if (!state) {
        return initialState;
    }

    switch (action.type) {
        case INCREMENT_COUNTER:
            return increment(state, action);
        case DECREMENT_COUNTER:
            return decrement(state, action);
        default:
            return state;
    }
}

