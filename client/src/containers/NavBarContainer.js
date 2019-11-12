import { connect } from 'react-redux';
import NavBar from '../components/header/navbar';

const mapStateToProps = state => {
  return {
    categories: state.category.categories,
  };
};

export default connect(mapStateToProps)(NavBar);
