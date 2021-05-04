import React from 'react';
import Header from './Components/Header';
import Home from './Components/Home';
import Detail from './Components/Detail'
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Components/Login';
function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
        <Switch>
            <Route exact path="/detail/:id" component={Detail} />
        </Switch>
        <Switch>
            <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
