import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import { useAppContext } from "../libs/ContextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import {
    HelpBlock,
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import "./SignUp.css";
import { Auth } from 'aws-amplify';

export default function SignUp() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",        
        confirmPassword: "",
        confirmationCode: ""
    });

    const history = useHistory();
    const [newUser, setNewUser] = useState(null);
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            fields.email.length > 0 && fields.password.length > 0 && fields.password === fields.confirmPassword 
        );
    }

    function validateConfirmation() {
        return (
            fields.confirmationCode.length > 0
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const user = await Auth.signUp({
                username: fields.email,
                password: fields.password
            })        
            setIsLoading(false);            
            setNewUser(user);
        } catch (e) {
            if (e.message === 'UsernameExistsException') {
                await Auth.resendSignUp({
                    username: fields.email
                });
            }
            onError(e);
            setIsLoading(false);
        }
    }

    async function handleConfirmationSubmit(event) {        
        event.preventDefault();        
        setIsLoading(true);

        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode);
            await Auth.signIn(fields.email, fields.password);

            userHasAuthenticated(true);
            history.push("/");
        } catch(e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmationSubmit}>
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <ControlLabel>Confirmation Code</ControlLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        onChange={handleFieldChange}
                        value={fields.confirmationCode}
                    />
                    <HelpBlock> Please check Email for Code </HelpBlock>                    
                </FormGroup>
                <LoaderButton 
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateConfirmation()}
                >
                    Validate
                </LoaderButton>
            </form>
        );
    }

    function renderSignUpForm() {
        return(
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
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={fields.confirmPassword}
                        onChange={handleFieldChange}                        
                    />                    
                </FormGroup>
                <LoaderButton 
                    block
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateForm()}                    
                >
                    SignUp
                </LoaderButton>                
            </form>
        );
    }

    return (
        <div className="Signup">
            {newUser === null ? renderSignUpForm() : renderConfirmationForm()}
        </div>
    );
}

