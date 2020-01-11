import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './component/index'

function App() {
  return (
    <Router className="App">
      <Route exact path="/" component={Home}/>
    </Router>
  );
}

export default App;
