import { connect } from 'react-redux';
import PageBreadcrumb from '../components/breadcrumb';
import { fetchBreadcrumb } from '../actions/categoryAction';

const mapStateToProps = state => {
  return {
    breadcrumb: state.category.breadcrumb,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBreadcrumb: cateID => {
      dispatch(fetchBreadcrumb(cateID));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageBreadcrumb);
