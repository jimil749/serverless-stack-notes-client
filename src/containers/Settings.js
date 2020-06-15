import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import { onError } from '../libs/errorLib';
import config from '../config';
import { Elements, StripeProvider } from "react-stripe-elements";
import BillingForm from "../components/BillingForm";
import "./Settings.css";


export default function Settings() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [stripe, setStripe] = useState(null);

    useEffect(() => {
        setStripe(window.Stripe(config.STRIPE_KEY));
    }, [])

    function billUser(details) {
        return API.post("notes", "/billing", {
            body: details
        });
    }

    async function handleFormSubmit(storage, { token, error }) {
        if (error) {
            onError(error);
            return;
        }
        setIsLoading(true);
        
        try {
            await billUser({
                storage,
                source: token.id
            });

            alert("Your card has been charge successfully!");
            history.push("/");
        } catch(e) {
            onError(e);
        }
    }

    return (
        <div className="settings">
            <StripeProvider stripe={stripe}>
                <Elements>
                    <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
                </Elements>
            </StripeProvider>
        </div>
    );
}