import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './configs/axios';
import './App.css';
import './general.scss';
import Home from './scenes/Home';
import PageLayout from './layout/PageLayout';
import SellerLogin from './components/seller/login/Login';
import SellerLayout from './layout/SellerLayout';
import Product from './components/seller/product/Product';
import SellerPrivateRoute from './layout/SellerPrivateRoute';
import Order from './components/seller/order/Order';
// import AdminLayout from './layout/AdminLayout';
// import ProductList from './scenes/ProductList';
// import ProductDetail from './scenes/ProductDetail';
// import Cart from './components/cart';

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
          {/* <PageLayout path='/categories/:id' component={ProductList} /> */}
          {/* <AdminLayout path='/admin' component={() => <div>admin</div>} />
          <PageLayout path='/products/:id' component={ProductDetail} />
          <PageLayout exact path='/cart' component={Cart} /> */}
          {/* <PageLayout exact path='/' component={Home} /> */}
          <SellerPrivateRoute path='/seller/orders' component={Order} />
          <SellerPrivateRoute path='/seller/products' component={Product} />
          <Route exact path='/seller/login' component={SellerLogin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
