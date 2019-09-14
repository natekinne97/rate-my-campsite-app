import React from 'react';
import {Route, Switch} from 'react-router-dom';

// import context
import campsiteContext from '../../context/context';
// Components
import Menu from '../Menu/Menu';
import Homepage from '../Homepage/Homepage';
import AddCampsite from '../AddCampsite/AddCampsite';
import LoginPage from '../../routes/LoginPage'
import CreateAccount from '../Create-Account/CreateAccount';
import Info from '../Info/Info';
// private route
import PrivateRoute from '../../routes/private';

class App extends React.Component{
  static contextType = campsiteContext;

  
  // renders menu on specific fields
  renderMenu(){
    
    return(
      <>
        {['/', '/info/:infoId', '/post', '/login', '/signup'].map(path => (
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
              component={CreateAccount}
            />
            {/* info/details page */}
            <Route
              path='/info/:infoId'
              component={Info}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
