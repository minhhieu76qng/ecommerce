import { connect } from 'react-redux';
import Homepage from '../components/homepage/Homepage';
import { fetchRootCategory } from '../actions/categoryAction';

const mapStateToProps = (state) => {
  return {
    rootCategory: state.category.rootCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log(fetchRootCategory);
  return {
    fetchRootCategory: () => {
      dispatch(fetchRootCategory())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);