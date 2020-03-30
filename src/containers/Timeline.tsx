import Timeline from './../views/Timeline/Timeline';
import { connect } from 'react-redux';
import actions from './../store/actions';

const mapStateToProps = (state: any): any => {
  return {
    items: state.items,
  };
};

// Question - Best way to mapDipatchToProps, dispatch here or in view
const mapDispatchToProps = (dispatch: any): any => ({
  createItem: (description: string): void => dispatch(actions.createItem(description)),
  deleteItem: (id: number): void => dispatch(actions.deleteItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
