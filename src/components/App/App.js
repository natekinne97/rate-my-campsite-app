import React from 'react';
import {Route, Switch} from 'react-router-dom';

// import context
import campsiteContext from '../../context/context';
// Components
import Menu from '../Menu/Menu';
import Homepage from '../Homepage/Homepage';
import AddCampsite from '../AddCampsite/AddCampsite';
import LoginPage from '../../routes/LoginPage'
import CreatePage from '../../routes/CreatePage';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import Reset from '../Reset/Reset';
import Info from '../Info/Info';
// private route
import PrivateRoute from '../../routes/private';

class App extends React.Component{
  static contextType = campsiteContext;

  
  // renders menu on specific fields
  renderMenu(){
    
    return(
      <>
        {['/', '/info/:infoId', '/post', '/login', '/signup', '/reset/:token','/forgot-password'].map(path => (
          <Route 
            exact
            key={path}
            path={path} 
            component={Menu} 
            />
        ))}
      </>
    )
  }

  render(){
    localStorage.lastUrl = window.location.pathname;
    return(
      <div>
        <nav>
          <this.renderMenu/>
        </nav>
        <main>
          <Switch>
            {/* homepage */}
            <Route
              exact
              path='/'
              component={Homepage}
            />
            {/* Post  new site*/}
            <PrivateRoute
              path='/post'
              component={AddCampsite}
              />
            {/* login route */}
            <Route
              path="/login"
              component={LoginPage}
            />
            {/* signup */}
            <Route
              path="/signup"
              component={CreatePage}
            />
            {/* info/details page */}
            <Route
              path='/info/:infoId'
              component={Info}
            />
            {/* forgot password */}
            <Route
              path='/forgot-password'
              component={ForgotPassword}
            />
            {/* reset password */}
            <Route
            path='/reset/:token'
            component={Reset}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
