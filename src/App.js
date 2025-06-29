import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { Switch, Route } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from "./components/Dashboard";
import Unauthorized from './components/Unauthorized';
import EntryPage from "./components/EntryPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className = "content">
        <Switch>
          <Route path = "/sleep/:id" component = {EntryPage} />
          <PrivateRoute path = "/dashboard" component = {Dashboard} />
          <Route path = "/unauthorized" component = {Unauthorized} />
          <Route path = "/signup" component = {Register} />
          <Route exact path = "/" component = {Login} />
          <Route component = {NotFound} />
        </Switch>
      </div>
      

    </div>
  );
}

export default App;
