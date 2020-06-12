import React, { useState } from 'react';
import {  FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css';
import { Auth } from 'aws-amplify';
import { useAppContext } from '../libs/ContextLib';
import { onError } from '../libs/errorLib';
import { useHistory } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
//using custom hook to set fields.
import { useFormFields } from '../libs/hooksLib';

export default function Login() {

    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    })

    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await Auth.signIn(fields.email, fields.password);
            userHasAuthenticated(true);
            history.push("/");
        } catch(e) {
            onError(e);
        }
    }

    const validateForm = () => {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl 
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <LoaderButton 
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Login
                </LoaderButton>
            </form>
        </div>
    );
}