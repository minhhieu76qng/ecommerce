import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './configs/axios';
import './App.css';
import './general.scss';
import Home from './scenes/Home';
import PageLayout from './layout/PageLayout';
// import AdminLayout from './layout/AdminLayout';
import ProductList from './scenes/ProductList';
// import ProductDetail from './scenes/ProductDetail';
// import Cart from './components/cart';
// import SellerLoginContainer from './containers/SellerLoginContainer';

function App({ extractAndStoreUser, fetchCategories }) {
  useEffect(() => {
    extractAndStoreUser();
  }, [extractAndStoreUser]);

  useEffect(() => {
    // fetch menu
    fetchCategories();
  }, [])

  return (
    <div className='App'>
      <Router>
        <Switch>
          <PageLayout path='/categories/:id' component={ProductList} />
          {/* <AdminLayout path='/admin' component={() => <div>admin</div>} />
          <PageLayout path='/products/:id' component={ProductDetail} />
          <PageLayout exact path='/cart' component={Cart} /> */}
          <PageLayout exact path='/' component={Home} />
          {/* <SellerLoginContainer /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
