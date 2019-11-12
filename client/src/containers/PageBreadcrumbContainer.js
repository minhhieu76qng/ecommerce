import { connect } from 'react-redux';
import PageBreadcrumb from '../components/breadcrumb';

const mapStateToProps = state => {
  return {
    planeCategories: state.category.planeCategories,
  };
};

export default connect(mapStateToProps)(PageBreadcrumb);
