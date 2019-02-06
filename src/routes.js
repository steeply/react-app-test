import React from 'react';
import { Switch, Route } from 'react-router';
import App from './components/app';
import Home from './components/home';
import EditPage from './components/editPage';
import PageNotFound from './components/pageNotFound';

const Routes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/new" component={EditPage} />
      <Route path="/edit/:id(\d+)" component={EditPage} />
      <Route component={PageNotFound}/>
    </Switch>
  </App>
);

export default Routes;
