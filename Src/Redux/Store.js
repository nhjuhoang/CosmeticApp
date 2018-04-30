import { createStore } from 'redux';

const defaultState =
    {
        arrCart: [],
        item: {},
    }

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_CART':
            state.arrCart.concat([{ item: action.item }]);
            break;
        case 'REMOVE_CART':
            return { arrCart: action.arrCart, quantity: action.quantity - 1 };
            break;
        default:
            return state;
    }
}

const store = createStore(reducer);
export default store;