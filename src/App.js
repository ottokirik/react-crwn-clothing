import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.sass';

import HomePage from './pages/homepage';
import ShopPage from './pages/shop';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={ HomePage } />
        <Route path='/shop' component={ ShopPage } />
      </Switch>
    </div>
  );
}

export default App;
