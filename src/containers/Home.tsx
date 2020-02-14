import Home from './../views/Home/Home';
import { connect } from 'react-redux';
import actions from './../store/actions';

const mapStateToProps = (state: any): any => {
  return {
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch: any): any => ({
  createItem: actions.createItem,
  deleteItem: actions.deleteItem,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
