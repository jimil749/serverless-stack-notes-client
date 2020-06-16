import React from 'react';
import { Route } from 'react-router-dom';

export default function AppliedRoutes({ component: C, appProps, ...rest}) {
    return (
        <Route {...rest} render={props => <C {...props} {...appProps} />}/>
    )
}