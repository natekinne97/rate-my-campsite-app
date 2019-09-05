import React from 'react';
import {Route, Switch} from 'react-router-dom';
// Components
import Menu from '../Menu/Menu';
import Homepage from '../Homepage/Homepage';
import AddCampsite from '../AddCampsite/AddCampsite';
import Login from '../Login/Login';
import CreateAccount from '../Create-Account/CreateAccount';
import Info from '../Info/Info';

class App extends React.Component{

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
            <Route
              path='/post'
              component={AddCampsite}
              />
            {/* login route */}
            <Route
              path="/login"
              component={Login}
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
