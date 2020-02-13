import ACTIONS from './actions';
import _ from 'lodash';

export interface Memory {
  id: number;
  description: any;
}

export interface MemoriesState {
  items: Memory[];
}

const defaultState: MemoriesState = {
  items: [
    { id: 10, description: 'd10' },
    { id: 11, description: 'd11' },
  ],
};

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
