import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './scenes/Home';
import PageLayout from './layout/PageLayout';
import AdminLayout from './layout/AdminLayout';
import ProductList from './scenes/ProductList';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <AdminLayout path='/admin' component={() => <div>admin</div>} />
          <PageLayout path='/category/:id' component={ProductList} />
          <PageLayout exact path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
