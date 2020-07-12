import Timeline from '../views/Timeline/Timeline';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

const mapStateToProps = (state: object): object => {
  return {};
};

// Question - Best way to mapDipatchToProps, dispatch here or in view
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): object => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
