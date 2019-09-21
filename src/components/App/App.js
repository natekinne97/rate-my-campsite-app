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

// idle and refresh
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import IdleService from '../../services/idle-services';

class App extends React.Component{
  static contextType = campsiteContext;

  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }
  componentDidMount() {
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle)

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets()

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets  ()
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry()
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken()
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry()
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets()
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate()
  }

  
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
