import ACTIONS from './actions';
import Memory from './../models/MemoryModel';

type defaultStateInterface = { items: Memory[]; lastIndex: number };

const defaultState: defaultStateInterface = {
  lastIndex: 2,
  items: [
    { id: 0, description: 'Graduating high school' },
    { id: 1, description: "Studying for Universities' Tests" },
    { id: 2, description: 'Accepted in University'}
  ],
};

// [Question] Defining return type of a whole reducer/state aprt
const todoReducer = (state = defaultState, action: any): defaultStateInterface => {
  switch (action.type) {
    case ACTIONS.Types.CREATE_ITEM: {
      const newItem = { id: state.lastIndex + 1, description: action.payload };
      return { ...state, lastIndex: state.lastIndex + 1, items: [...state.items, newItem] };
    }

    case ACTIONS.Types.DELETE_ITEM: {
      return { ...state, items: [...state.items.slice(0, action.payload), ...state.items.slice(action.payload + 1)] };
    }

    default:
      return state;
  }
};

export default todoReducer;
