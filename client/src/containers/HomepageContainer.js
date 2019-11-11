import { connect } from 'react-redux';
import Homepage from '../components/homepage/Homepage';

const mapStateToProps = state => {
  return {
    categories: state.category.categories,
  };
};
export default connect(
  mapStateToProps,
  null,
)(Homepage);
