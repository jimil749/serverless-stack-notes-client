import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import Routes from './Routes';
import { AppContext } from './libs/ContextLib';
import { Auth } from 'aws-amplify';
import { useHistory, Link, withRouter } from 'react-router-dom';
import { onError } from './libs/errorLib';

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, [])

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current User') {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  const handleLogout = () => {
    Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  return(
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"> Scratch </Link>
          </Navbar.Brand>
          <Navbar.Toggle />          
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated 
              ?
              <> 
                <LinkContainer to="/settings">
                  <NavItem> Settings </NavItem>
                </LinkContainer>
                <NavItem onClick={handleLogout}> Logout </NavItem> 
              </>
              : <>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes appProps={{ isAuthenticated, userHasAuthenticated}}/>
      </AppContext.Provider>

    </div>
  )
}


export default withRouter(App);
