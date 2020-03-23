import ACTIONS from './actions';
import Memory from './../models/MemoryModel';
import _ from 'lodash';

const defaultState: { items: Memory[] } = {
  items: [
    { id: 1, description: 'Graduating high school' },
    { id: 2, description: "Studying for Universities' Tests" },
    { id: 3, description: 'Accepted in University'}
  ],
};

// [Question] Defining return type of a whole reducer/state aprt
const todoReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case ACTIONS.Types.CREATE_ITEM: {
      console.log(action);

      const item = action.payload;
      const newItem = { id: state.items.length + 1, description: item };
      const newState = _.cloneDeep(state);
      newState.items.push(newItem);
      return newState;
    }

    case ACTIONS.Types.DELETE_ITEM: {
      const newState = _.cloneDeep(state);
      const index = _.findIndex(newState.items, { id: action.payload });
      newState.items.splice(index, 1);
      return newState;
    }

    default:
      return state;
  }
};

export default todoReducer;
