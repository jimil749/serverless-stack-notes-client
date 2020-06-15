import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import NewNote from './containers/NewNote';
import Notes from './containers/Notes';
import Settings from './containers/Settings';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/signup">
                <SignUp />
            </Route>
            <Route path="/notes/new">
                <NewNote />
            </Route>
            <Route path="/notes/:id">
                <Notes />
            </Route>
            <Route path="/settings">
                <Settings />
            </Route>
            <Route>
                <NotFound />
            </Route>            
        </Switch>
    );
}