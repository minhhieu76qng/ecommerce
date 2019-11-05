import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './configs/axios';
import './App.css';
import './general.scss';
import Home from './scenes/Home';
import PageLayout from './layout/PageLayout';
import AdminLayout from './layout/AdminLayout';
import ProductList from './scenes/ProductList';
import ProductDetail from './scenes/ProductDetail';
import Cart from './components/cart';

function App({ extractAndStoreUser }) {
  useEffect(() => {
    extractAndStoreUser();
  }, [extractAndStoreUser]);

  return (
    <div className='App'>
      <Router>
        <Switch>
          <AdminLayout path='/admin' component={() => <div>admin</div>} />
          <PageLayout path='/categories/:id' component={ProductList} />
          <PageLayout path='/products/:id' component={ProductDetail} />
          <PageLayout exact path='/cart' component={Cart} />
          <PageLayout exact path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
