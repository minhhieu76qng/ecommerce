import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout'
import Home from './scenes/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/admin'>
            <div>df</div>
          </Route>
          <Route exact path='/'>
            <Layout>
              <Home />
            </Layout>
          </Route>
        </Switch>

      </Router>


    </div>
  );
}

export default App;
