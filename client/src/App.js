import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';

//pages
import AddUser  from './pages/addUser/add-user.component';
import Home from './pages/home/home.component';
import EditPage from './pages/editPage/edit-page.component';
import LoginPage from './pages/login/login.component';
import RegisterPage from './pages/register/register.component';

import store from './redux/store';
import { loadUser } from './redux/auth/auth.actions';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <Header />
      <Switch >
        <Route exact path='/' component={Home} />
        <Route path='/add-user' component={AddUser} />
        <Route path='/edit/:id' component={EditPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
      </Switch>
    </Fragment>
  );
}

export default App;
