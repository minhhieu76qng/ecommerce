import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './configs/axios';
import './App.css';
import './general.scss';
import Home from './scenes/Home';
import PageLayout from './layout/PageLayout';
import SellerLogin from './components/seller/login/Login';
import Product from './components/seller/product/Product';
import SellerPrivateRoute from './layout/SellerPrivateRoute';
import Order from './components/seller/order/Order';
import AddProductContainer from './containers/AddProductContainer';
import ProductList from './scenes/ProductList';
import ProductDetail from './scenes/ProductDetail';
import Cart from './components/cart';

function App({ extractAndStoreUser, fetchCategories }) {
  useEffect(() => {
    extractAndStoreUser();
  }, [extractAndStoreUser]);

  useEffect(() => {
    // fetch menu
    fetchCategories();
  }, []);

  return (
    <div className='App'>
      <Router>
        <Switch>
          <PageLayout path='/categories/:id' component={ProductList} />
          <PageLayout path='/products/:id' component={ProductDetail} />
          <PageLayout exact path='/cart' component={Cart} />
          <PageLayout exact path='/' component={Home} />
          <SellerPrivateRoute
            path='/seller/orders'
            component={Order}
            title='Orders'
          />
          <SellerPrivateRoute
            title='Add product'
            path='/seller/products/add'
            component={AddProductContainer}
          />
          <SellerPrivateRoute
            path='/seller/products'
            component={Product}
            title='Products'
          />
          <Route exact path='/seller/login' component={SellerLogin} />
          <SellerPrivateRoute path='*'>
            <Redirect to='/seller/products' />
          </SellerPrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
