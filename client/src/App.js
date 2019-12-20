import React, { Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar.js';
import Landing from './components/layout/Landing.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';
import Alert from './components/layout/Alert.js';
import './App.css';

//redux 

import { Provider } from 'react-redux';
import store from './store';
import { loadUser }from './actions/auth';
import setAuthToken from './utils/setAuthToken';


  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

const App = () => { 
  useEffect(() => {
      store.dispatch(loadUser());
    }, []);

return (
<Provider store = {store}>
<Router>
    <Fragment>
      
      <Navbar />
      <Route exact path = "/" component={Landing} />
   	  <section className= "container">
        <Alert />

   	  	<Switch>

   	  	 <Route	exact path = "/login" component= {Login} />
   	  	 <Route exact path = "/register" component= {Register} />	

   	  	</Switch>

   	  </section>	
    </Fragment>
</Router>
</Provider>
)};

export default App;
