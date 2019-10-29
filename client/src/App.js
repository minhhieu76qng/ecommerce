import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './scenes/Home';
import PageLayout from './layout/PageLayout';
import AdminLayout from './layout/AdminLayout';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <AdminLayout path='/admin' component={() => (<div>admin</div>)} />
          <PageLayout path='/a' component={() => (<div>d</div>)} />
          <PageLayout exact path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
