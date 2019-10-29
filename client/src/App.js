import React from 'react';
import './App.css';
import Header from './components/header';
import Homepage from './components/homepage/Homepage';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Homepage />
      <Footer />
    </div>
  );
}

export default App;
