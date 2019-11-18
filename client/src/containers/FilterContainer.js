import { connect } from 'react-redux';
import Filter from '../components/sidebar/Filter';

const mapStateToProps = state => {
  return {
    sizes: state.productAttributes.sizes,
    colors: state.productAttributes.colors,
    brands: state.productAttributes.brands,
  };
};

export default connect(mapStateToProps)(Filter);
