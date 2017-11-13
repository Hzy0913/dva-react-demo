import React from 'react';
import { Router, Route, Switch,Redirect  } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Home from './routes/Home/Home';
import Details from './routes/Details/Details';
import Login from './routes/Login/Login';
import UserList from './routes/UserList/UserList';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/details/:id"  component={Details} />
        <Route path="/login"  component={Login} />
        <Route path="/userlist"  component={UserList} />
        <Route path="/"  component={Home} />
        <Redirect from="/" to="/login" />
      </Switch>


    </Router>
  );
}

export default RouterConfig;
