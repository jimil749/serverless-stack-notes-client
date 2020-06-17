import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import NewNote from './containers/NewNote';
import Notes from './containers/Notes';
import Settings from './containers/Settings';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnAuthenticatedRoute from './components/UnAuthenticatedRoute';
import AppliedRoute from './components/AppliedRoutes';

export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} appProps={appProps} />                
            <UnAuthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
            <UnAuthenticatedRoute path="/signup" exact component={SignUp} appProps={appProps} />            
            <AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />
            <AuthenticatedRoute path="/notes/new" exact component={NewNote} appProps={appProps} />                            
            <AuthenticatedRoute path="/notes/:id" exact component={Notes} appProps={appProps} />                
            <Route component={NotFound}/>           
        </Switch>
    );
}