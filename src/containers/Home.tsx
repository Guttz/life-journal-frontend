import Home from './../views/Home/Home';
import { StateProps, DispatchProps } from './../views/Home/Home';
import { connect } from 'react-redux';
import actions from './../store/actions';

const mapStateToProps = (state: any): StateProps => {
  return {
    items: state.items.items,
  };
};

// Question - Best way to mapDipatchToProps, dispatch here or in view
const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  createItem: (description: string): void => dispatch(actions.createItem(description)),
  deleteItem: (id: number): void => dispatch(actions.deleteItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
