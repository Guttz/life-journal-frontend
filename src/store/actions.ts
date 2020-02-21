// types of action
const Types = {
  CREATE_ITEM: 'CREATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
};

//[Question] - Should I create models for actions returns so I can declare functions return types?
// actions
const createItem = (description: string) => ({
  type: Types.CREATE_ITEM,
  payload: description,
});

const deleteItem = (id: number) => ({
  type: Types.DELETE_ITEM,
  payload: id,
});

export default {
  createItem,
  deleteItem,
  Types,
};
