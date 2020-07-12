import Timeline from './../views/Timeline/Timeline';
import { connect } from 'react-redux';

const mapStateToProps = (state: any): object => {
  return {};
};

// Question - Best way to mapDipatchToProps, dispatch here or in view
const mapDispatchToProps = (dispatch: any): object => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
